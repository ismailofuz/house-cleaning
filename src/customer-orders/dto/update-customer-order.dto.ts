import { PartialType } from '@nestjs/swagger';
import { CreateCustomerOrderDto } from './create-customer-order.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/common/types/enums';

export class UpdateCustomerOrderDto extends PartialType(
    CreateCustomerOrderDto,
) {
    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
