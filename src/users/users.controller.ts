import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryUsersDto } from './dto/query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ description: 'Get Uzbekistan regions' })
    @Get('regions')
    getRegions() {
        return this.usersService.getRegions();
    }

    @ApiOperation({ description: 'Get Uzbekistan districts' })
    @Get('districts/:region_id')
    getDistricts(@Param('region_id', ParseIntPipe) region_id: number) {
        return this.usersService.getDistricts(region_id);
    }

    @ApiOperation({ description: 'Create user' })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({ description: 'Find all users' })
    @Get()
    findAll(@Query() query: QueryUsersDto) {
        return this.usersService.findAll(query);
    }

    @ApiOperation({ description: 'Find one user by id' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @ApiOperation({ description: 'Update user' })
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ description: 'Remove user' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
