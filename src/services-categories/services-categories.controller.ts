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
import { ServicesCategoriesService } from './services-categories.service';
import { CreateServicesCategoryDto } from './dto/create-services-category.dto';
import { UpdateServicesCategoryDto } from './dto/update-services-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryCategoriesDto } from './dto/query-categories.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Categories')
@Controller('services-categories')
export class ServicesCategoriesController {
    constructor(
        private readonly servicesCategoriesService: ServicesCategoriesService,
    ) {}

    @Roles(Role.SUPER_ADMIN)
    @Post()
    create(@Body() createServicesCategoryDto: CreateServicesCategoryDto) {
        return this.servicesCategoriesService.create(createServicesCategoryDto);
    }

    @Public()
    @Get()
    findAll(@Query() query: QueryCategoriesDto) {
        return this.servicesCategoriesService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.servicesCategoriesService.findOne(id);
    }

    @Roles(Role.SUPER_ADMIN)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateServicesCategoryDto: UpdateServicesCategoryDto,
    ) {
        return this.servicesCategoriesService.update(
            id,
            updateServicesCategoryDto,
        );
    }

    @Roles(Role.SUPER_ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.servicesCategoriesService.remove(id);
    }
}
