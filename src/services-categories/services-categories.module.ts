import { Module } from '@nestjs/common';
import { ServicesCategoriesService } from './services-categories.service';
import { ServicesCategoriesController } from './services-categories.controller';

@Module({
  controllers: [ServicesCategoriesController],
  providers: [ServicesCategoriesService]
})
export class ServicesCategoriesModule {}
