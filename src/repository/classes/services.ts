import { ServicesI } from 'src/common/types/interfaces';
import { InjectKnex, Knex } from 'nestjs-knex';
import ServicesRepositoryI, {
    CreateService,
    ServicesQuery,
} from '../interfaces/services';

export class ServicesRepository implements ServicesRepositoryI {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    private get service() {
        return this.knex<ServicesI>('services');
    }

    async create(dto: CreateService): Promise<ServicesI> {
        const t = await this.knex.transaction();
        try {
            const service = await this.service
                .insert(dto)
                .returning('*')
                .transacting(t);
            t.commit();
            return service[0];
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    async find(query: ServicesQuery): Promise<any> {
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

        const dbQuery = this.service.select('*');

        const totalCount = (
            await dbQuery.clone().groupBy('services.id').count()
        ).length;

        if (q_uz) {
            dbQuery.where(function () {
                this.whereILike('services.name_uz', `%${q_uz}%`);
            });
        }

        if (q_ru) {
            dbQuery.where(function () {
                this.whereILike('services.name_ru', `%${q_ru}%`);
            });
        }

        const currentCount = (
            await dbQuery.clone().groupBy('services.id').count()
        ).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        const service = await dbQuery;

        return {
            entities: service,
            pageInfo: {
                totalCount,
                currentCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    findOne(id: number): Promise<ServicesI> {
        return this.service.where({ id }).first();
    }

    async update(
        id: number,
        update: Partial<Omit<ServicesI, 'id'>>,
    ): Promise<ServicesI> {
        const t = await this.knex.transaction();
        try {
            const updateService = await this.service
                .where({ id })
                .update({ ...update })
                .returning('*')
                .transacting(t);
            t.commit();
            return updateService[0];
        } catch (error) {
            t.rollback();
            throw error;
        }
    }

    remove(id: number): Promise<number> {
        return this.service.where({ id }).del();
    }
}
