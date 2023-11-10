import { Injectable } from '@nestjs/common';
import { CreateServicesCategoryDto } from './dto/create-services-category.dto';
import { UpdateServicesCategoryDto } from './dto/update-services-category.dto';
import { ServiceCategoriesRepository } from 'src/repository/classes/service-categories';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ServicesCategoriesService {
    constructor(
        private readonly repository: ServiceCategoriesRepository,
        private readonly logger: PinoLogger,
    ) {}

    create(createServicesCategoryDto: CreateServicesCategoryDto) {
        return this.repository.create(createServicesCategoryDto);
    }

    findAll(query: QueryCategoriesDto) {
        return this.repository.find(query);
    }

    findOne(id: number) {
        return this.repository.findOne(id);
    }

    update(id: number, updateServicesCategoryDto: UpdateServicesCategoryDto) {
        return this.repository.update(id, updateServicesCategoryDto);
    }

    remove(id: number) {
        return this.repository.remove(id);
    }
}
