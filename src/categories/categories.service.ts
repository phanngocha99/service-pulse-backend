import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto,
} from './dto/category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async findListCategory(query: QueryCategoryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { label: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.category.count({ where }),
      this.prismaService.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
      data,
    };
  }

  async findCategoryByName(name: string) {
    return this.prismaService.category.findUnique({
      where: {
        name,
      },
    });
  }

  async findCategoryById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async createCategory(dto: CreateCategoryDto, req: LoginResponse) {
    const categoryExists = await this.findCategoryByName(dto.name);
    if (categoryExists) {
      throw new ConflictException('Category already taken!');
    }

    return this.prismaService.category.create({
      data: {
        name: dto.name,
        label: dto.label,
        urlProject: dto.urlProject,
        description: dto.description,
        defaultgroupId: dto.defaultgroupId,
        subCategoryId: dto.subCategoryId ?? '',
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        label: true,
        urlProject: true,
        description: true,
        defaultgroupId: true,
        subCategoryId: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto, req: LoginResponse) {
    const categoryExists = await this.findCategoryById(id);
    if (!categoryExists) {
      throw new NotFoundException('Category not found!');
    }

    if (dto.name !== categoryExists.name) {
      const nameTaken = await this.findCategoryByName(dto.name);
      if (nameTaken) {
        throw new ConflictException('Category name already taken!');
      }
    }

    const data: any = {
      name: dto.name,
      label: dto.label,
      urlProject: dto.urlProject,
      description: dto.description,
      active: dto.active,
      updatedById: req.userId,
    };

    if (typeof dto.defaultgroupId !== 'undefined') {
      data.defaultgroupId = dto.defaultgroupId;
    }

    if (typeof dto.subCategoryId !== 'undefined') {
      data.subCategoryId = dto.subCategoryId;
    }

    return this.prismaService.category.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        label: true,
        urlProject: true,
        description: true,
        defaultgroupId: true,
        subCategoryId: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async getSubCategoriesByCategory(id: string) {
    await this.findCategoryById(id);
    return this.prismaService.subCategory.findMany({
      where: { categoryId: id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getIncidentsByCategory(id: string) {
    await this.findCategoryById(id);
    return this.prismaService.incident.findMany({
      where: { categoryId: id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
