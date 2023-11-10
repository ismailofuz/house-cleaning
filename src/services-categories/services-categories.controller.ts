import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ServicesCategoriesService } from './services-categories.service';
import { CreateServicesCategoryDto } from './dto/create-services-category.dto';
import { UpdateServicesCategoryDto } from './dto/update-services-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('services-categories')
export class ServicesCategoriesController {
    constructor(
        private readonly servicesCategoriesService: ServicesCategoriesService,
    ) {}

    @Post()
    create(@Body() createServicesCategoryDto: CreateServicesCategoryDto) {
        return this.servicesCategoriesService.create(createServicesCategoryDto);
    }

    @Get()
    findAll() {
        return this.servicesCategoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesCategoriesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateServicesCategoryDto: UpdateServicesCategoryDto,
    ) {
        return this.servicesCategoriesService.update(
            +id,
            updateServicesCategoryDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesCategoriesService.remove(+id);
    }
}
