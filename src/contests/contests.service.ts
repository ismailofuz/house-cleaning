import { Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { ContestsRepository } from 'src/repository/classes/contests';
import { ContestsQueryDto } from './dto/contests-query.dto';

@Injectable()
export class ContestsService {
    constructor(private readonly repository: ContestsRepository) {}

    create(createContestDto: CreateContestDto) {
        return this.repository.create(createContestDto);
    }

    findAll(query: ContestsQueryDto) {
        return this.repository.find(query);
    }

    findOne(id: number) {
        return this.repository.findOne(id);
    }

    update(id: number, updateContestDto: UpdateContestDto) {
        return this.repository.update(id, updateContestDto);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }
}
