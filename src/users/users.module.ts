import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/repository/classes/users';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
})
export class UsersModule {}
