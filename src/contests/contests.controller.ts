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
import { ContestsService } from './contests.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { ApiTags } from '@nestjs/swagger';
import { ContestsQueryDto } from './dto/contests-query.dto';

@ApiTags('Contest')
@Controller('contests')
export class ContestsController {
    constructor(private readonly contestsService: ContestsService) {}

    @Post()
    create(@Body() createContestDto: CreateContestDto) {
        return this.contestsService.create(createContestDto);
    }

    @Get()
    findAll(@Query() query: ContestsQueryDto) {
        return this.contestsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contestsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateContestDto: UpdateContestDto,
    ) {
        return this.contestsService.update(+id, updateContestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contestsService.remove(+id);
    }
}
