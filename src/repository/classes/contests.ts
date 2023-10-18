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

    async find(query: ContestQuery): Promise<any> {
        const { q, page } = query;

        let q_uz: string;
        let q_ru: string;
        if (q) {
            let q_replace = q.replace(/\s+/g, ' ').trim();
            q_replace = q_replace.replace(/['‘’`]/g, '‘');
            if (/[\w\s,.!?'"’‘`-]+/g.test(q_replace)) {
                q_uz = q_replace;
            } else if (/^[а-яА-Я ]+$/.test(q_replace)) {
                q_ru = q_replace;
            }
        }

        const dbQuery = this.contest
            .select(
                'id',
                'name_uz',
                'name_ru',
                'name_en',
                'description_uz',
                'description_ru',
                'description_en',
                'powered_by',
                'starts_at',
                'contest_type',
                'questions_count',
                'code',
                'first_place_prize',
                'second_place_prize',
                'third_place_prize',
                'status',
            )
            .orderBy('id', 'asc')
            .groupBy('contests.id');

        const totalCount = (
            await dbQuery.clone().groupBy('contests.id').count()
        ).length;

        if (q_uz) {
            dbQuery.where(function () {
                this.orWhereILike('contests.name_uz', `%${q_uz}%`);
            });
        }

        if (q_ru) {
            dbQuery.where(function () {
                this.orWhereILike('contests.name_ru', `%${q_ru}%`);
            });
        }

        const currentCount = (
            await dbQuery.clone().groupBy('contests.id').count()
        ).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        dbQuery.orderBy('id');

        const contests = await dbQuery;

        return {
            entities: contests,
            pageInfo: {
                currentCount,
                totalCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    findOne(id: number): Promise<ContestI> {
        return this.contest.where({ id }).first();
    }

    delete(id: number): Promise<number> {
        return this.contest.where({ id }).del();
    }
}
