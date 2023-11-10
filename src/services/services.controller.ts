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

@ApiTags('Services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    findAll(@Query() query: QueryServiceDto) {
        return this.servicesService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateServiceDto: UpdateServiceDto,
    ) {
        return this.servicesService.update(id, updateServiceDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.servicesService.remove(id);
    }
}
