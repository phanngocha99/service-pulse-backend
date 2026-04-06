import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
  QuerySubCategoryDto,
} from './dto/subcategory.dto.js';

@Injectable()
export class SubCategoriesService {
  constructor(private prismaService: PrismaService) {}

  async findListSubCategory(query: QuerySubCategoryDto) {
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
      this.prismaService.subCategory.count({ where }),
      this.prismaService.subCategory.findMany({
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

  async findSubCategoryById(id: string) {
    const subCategory = await this.prismaService.subCategory.findUnique({
      where: { id },
    });
    if (!subCategory) throw new NotFoundException('SubCategory not found');
    return subCategory;
  }

  async createSubCategory(dto: CreateSubCategoryDto, req: LoginResponse) {
    const exists = await this.prismaService.subCategory.findFirst({
      where: {
        name: dto.name,
        categoryId: dto.categoryId,
      },
    });
    if (exists) {
      throw new ConflictException(
        'SubCategory already exists in this category',
      );
    }

    return this.prismaService.subCategory.create({
      data: {
        name: dto.name,
        label: dto.label,
        description: dto.description,
        categoryId: dto.categoryId,
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        label: true,
        description: true,
        categoryId: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async updateSubCategory(
    id: string,
    dto: UpdateSubCategoryDto,
    req: LoginResponse,
  ) {
    const subCategoryExists = await this.findSubCategoryById(id);
    if (!subCategoryExists) {
      throw new NotFoundException('SubCategory not found!');
    }

    const data: any = {
      name: dto.name,
      label: dto.label,
      description: dto.description,
      categoryId: dto.categoryId,
      active: dto.active,
      updatedById: req.userId,
    };

    return this.prismaService.subCategory.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        label: true,
        description: true,
        categoryId: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async getIncidentsBySubCategory(id: string) {
    await this.findSubCategoryById(id);
    return this.prismaService.incident.findMany({
      where: { subCategoryId: id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
