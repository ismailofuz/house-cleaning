import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { CustomerOrderRepository } from 'src/repository/classes/customer-orders';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CustomerOrdersService {
    constructor(
        private readonly repository: CustomerOrderRepository,
        private readonly logger: PinoLogger,
    ) {}

    create(createCustomerOrderDto: CreateCustomerOrderDto) {
        return this.repository.create(createCustomerOrderDto);
    }

    findAll(query: QueryOrderDto) {
        return this.repository.find(query);
    }

    findOne(id: number) {
        return this.repository.findOne(id);
    }

    update(id: number, updateCustomerOrderDto: UpdateCustomerOrderDto) {
        return this.repository.update(id, updateCustomerOrderDto);
    }

    remove(id: number) {
        return this.repository.remove(id);
    }
}
