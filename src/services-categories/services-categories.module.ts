import { Module } from '@nestjs/common';
import { ServicesCategoriesService } from './services-categories.service';
import { ServicesCategoriesController } from './services-categories.controller';
import { ServiceCategoriesRepository } from 'src/repository/classes/service-categories';

@Module({
    controllers: [ServicesCategoriesController],
    providers: [ServicesCategoriesService, ServiceCategoriesRepository],
})
export class ServicesCategoriesModule {}
