import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from 'src/repository/classes/services';
import { QueryServiceDto } from './dto/query-service.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly repository: ServicesRepository) {}

    create(createServiceDto: CreateServiceDto) {
        return this.repository.create(createServiceDto);
    }

    findAll(query: QueryServiceDto) {
        return this.repository.find(query);
    }

    findOne(id: number) {
        return this.repository.findOne(id);
    }

    update(id: number, updateServiceDto: UpdateServiceDto) {
        return this.repository.update(id, updateServiceDto);
    }

    remove(id: number) {
        return this.repository.remove(id);
    }
}
