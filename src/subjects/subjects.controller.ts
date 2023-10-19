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
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/enums';
import { SubjectsQueryDto } from './dto/subjects-query.dto';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectsService.create(createSubjectDto);
    }

    @Get()
    findAll(@Query() query: SubjectsQueryDto) {
        return this.subjectsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectsService.findOne(+id);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSubjectDto: UpdateSubjectDto,
    ) {
        return this.subjectsService.update(+id, updateSubjectDto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectsService.remove(+id);
    }
}
