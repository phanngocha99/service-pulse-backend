import { Module } from '@nestjs/common';
import { SubCategoriesController } from './subcategories.controller.js';
import { SubCategoriesService } from './subcategories.service.js';

@Module({
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
})
export class SubCategoriesModule {}
