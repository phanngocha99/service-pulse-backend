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
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
  QuerySubCategoryDto,
} from './dto/subcategory.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { SubCategoriesService } from './subcategories.service.js';
import { SubCategoryResponse } from '../common/interfaces/subcategory-response.interface.js';

@Controller('subcategories')
export class SubCategoriesController {
  constructor(private subCategoriesService: SubCategoriesService) {}

  @Get('health')
  test() {
    return 'subcategories-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_SUBCATEGORY])
  @Post()
  createSubCategory(
    @Body(ValidationPipe) createSubCategoryDto: CreateSubCategoryDto,
    @Request() req,
  ): Promise<SubCategoryResponse> {
    return this.subCategoriesService.createSubCategory(
      createSubCategoryDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_SUBCATEGORY])
  @Get()
  getListSubCategory(@Query() query: QuerySubCategoryDto) {
    return this.subCategoriesService.findListSubCategory(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_SUBCATEGORY])
  @Get(':id')
  getSubCategory(@Param('id') id: string) {
    return this.subCategoriesService.findSubCategoryById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_SUBCATEGORY])
  @Patch(':id')
  updateSubCategory(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSubCategoryDto: UpdateSubCategoryDto,
    @Request() req,
  ): Promise<SubCategoryResponse> {
    return this.subCategoriesService.updateSubCategory(
      id,
      updateSubCategoryDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_SUBCATEGORY])
  @Get(':id/incidents')
  getIncidents(@Param('id') id: string) {
    return this.subCategoriesService.getIncidentsBySubCategory(id);
  }
}
