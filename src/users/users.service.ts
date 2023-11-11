import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repository/classes/users';
import { QueryUsersDto } from './dto/query.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    getRegions() {
        return this.userRepository.getRegions();
    }

    getDistricts(region_id: number) {
        return this.userRepository.getDistricts(region_id);
    }

    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto);
    }

    findAll(query: QueryUsersDto) {
        return this.userRepository.findUsers(query);
    }

    myProfile(user_id: number) {
        return this.userRepository.myProfile(user_id);
    }

    findOne(id: number) {
        return this.userRepository.findById(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}
