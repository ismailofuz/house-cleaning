import { Injectable } from '@nestjs/common';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { CustomerOrderRepository } from 'src/repository/classes/customer-orders';

@Injectable()
export class CustomerOrdersService {
    constructor(private readonly repository: CustomerOrderRepository) {}

    create(createCustomerOrderDto: CreateCustomerOrderDto) {
        return this.repository.create(createCustomerOrderDto);
    }

    findAll(query: QueryOrderDto) {
        return `This action returns all customerOrders`;
    }

    findOne(id: number) {
        return `This action returns a #${id} customerOrder`;
    }

    update(id: number, updateCustomerOrderDto: UpdateCustomerOrderDto) {
        return `This action updates a #${id} customerOrder`;
    }

    remove(id: number) {
        return `This action removes a #${id} customerOrder`;
    }
}
