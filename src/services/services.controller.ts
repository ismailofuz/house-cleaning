import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryServiceDto } from './dto/query-service.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Roles(Role.SUPER_ADMIN)
    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Public()
    @Get()
    findAll(@Query() query: QueryServiceDto) {
        return this.servicesService.findAll(query);
    }

    @Public()
    @Get(':categoryId')
    findCategoryServices(
        @Param('categoryId', ParseIntPipe) category_id: number,
    ) {
        return this.servicesService.findCategoryServices(category_id);
    }

    @Get('one/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.servicesService.findOne(id);
    }

    @Roles(Role.SUPER_ADMIN)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Roles(Role.SUPER_ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.servicesService.remove(id);
    }
}
