import {
  Controller,
  UseGuards,
  Query,
  Get,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Request,
  Param,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto,
} from './dto/category.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { CategoriesService } from './categories.service.js';
import { CategoryResponse } from '../common/interfaces/category-response.interface.js';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('health')
  test() {
    return 'categories-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_CATEGORY])
  @Post()
  createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
    @Request() req,
  ): Promise<CategoryResponse> {
    return this.categoriesService.createCategory(createCategoryDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_CATEGORY])
  @Get()
  getListCategory(@Query() query: QueryCategoryDto) {
    return this.categoriesService.findListCategory(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_CATEGORY])
  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.findCategoryById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_CATEGORY])
  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ): Promise<CategoryResponse> {
    return this.categoriesService.updateCategory(
      id,
      updateCategoryDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_CATEGORY])
  @Get(':id/subcategories')
  getSubCategories(@Param('id') id: string) {
    return this.categoriesService.getSubCategoriesByCategory(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_CATEGORY])
  @Get(':id/incidents')
  getIncidents(@Param('id') id: string) {
    return this.categoriesService.getIncidentsByCategory(id);
  }
}
