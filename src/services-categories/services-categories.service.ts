import { Injectable } from '@nestjs/common';
import { CreateServicesCategoryDto } from './dto/create-services-category.dto';
import { UpdateServicesCategoryDto } from './dto/update-services-category.dto';

@Injectable()
export class ServicesCategoriesService {
    create(createServicesCategoryDto: CreateServicesCategoryDto) {
        return 'This action adds a new servicesCategory';
    }

    findAll() {
        return `This action returns all servicesCategories`;
    }

    findOne(id: number) {
        return `This action returns a #${id} servicesCategory`;
    }

    update(id: number, updateServicesCategoryDto: UpdateServicesCategoryDto) {
        return `This action updates a #${id} servicesCategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} servicesCategory`;
    }
}
