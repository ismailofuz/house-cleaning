import { Module } from '@nestjs/common';
import { CustomerOrdersService } from './customer-orders.service';
import { CustomerOrdersController } from './customer-orders.controller';
import { CustomerOrderRepository } from 'src/repository/classes/customer-orders';

@Module({
    controllers: [CustomerOrdersController],
    providers: [CustomerOrdersService, CustomerOrderRepository],
})
export class CustomerOrdersModule {}
