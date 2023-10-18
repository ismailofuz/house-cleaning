import { ContestI } from 'src/common/types/interfaces';
import { CreateContestDto } from 'src/contests/dto/create-contest.dto';
import { UpdateContestDto } from 'src/contests/dto/update-contest.dto';
import ContestsRepositoryI, { ContestQuery } from '../interfaces/contests';
import { InjectKnex, Knex } from 'nestjs-knex';

export class ContestsRepository implements ContestsRepositoryI {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    private get contest() {
        return this.knex<ContestI>('contests');
    }

    async create(dto: CreateContestDto): Promise<ContestI> {
        return this.contest
            .insert(dto)
            .returning('*')
            .then(async (res) => {
                return res[0];
            });
    }

    update(id: number, dto: UpdateContestDto): Promise<number> {
        return this.contest.where({ id }).update({ ...dto });
    }

    find(query: ContestQuery): Promise<ContestI[]> {
        const { q, page } = query;
        return this.contest.offset(page.offset).limit(page.limit);
    }

    findOne(id: number): Promise<ContestI> {
        return this.contest.where({ id }).first();
    }

    delete(id: number): Promise<number> {
        return this.contest.where({ id }).del();
    }
}
