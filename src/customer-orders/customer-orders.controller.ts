import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { CustomerOrdersService } from './customer-orders.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { QueryOrderDto } from './dto/query-order.dto';

@ApiTags('Customer orders')
@ApiBearerAuth()
@Controller('customer-orders')
export class CustomerOrdersController {
    constructor(
        private readonly customerOrdersService: CustomerOrdersService,
    ) {}

    @Roles(Role.USER)
    @Post()
    create(@Body() createCustomerOrderDto: CreateCustomerOrderDto) {
        return this.customerOrdersService.create(createCustomerOrderDto);
    }

    @Roles(Role.SUPER_ADMIN)
    @Get()
    findAll(@Query() query: QueryOrderDto) {
        return this.customerOrdersService.findAll(query);
    }

    @Roles(Role.SUPER_ADMIN)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.customerOrdersService.findOne(id);
    }

    @Roles(Role.SUPER_ADMIN)
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateCustomerOrderDto: UpdateCustomerOrderDto,
    ) {
        return this.customerOrdersService.update(id, updateCustomerOrderDto);
    }

    @Roles(Role.SUPER_ADMIN)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.customerOrdersService.remove(id);
    }
}
