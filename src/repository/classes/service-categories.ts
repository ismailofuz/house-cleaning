import { ServiceCategoriesI } from 'src/common/types/interfaces';
import ServiceCategoriesRepositoryI, {
    CategoryQuery,
    CreateCategory,
} from '../interfaces/service-categories';
import { InjectKnex, Knex } from 'nestjs-knex';
import { PinoLogger } from 'nestjs-pino';

export class ServiceCategoriesRepository
    implements ServiceCategoriesRepositoryI
{
    constructor(
        @InjectKnex() private readonly knex: Knex,
        private readonly logger: PinoLogger,
    ) {}

    private get category() {
        return this.knex<ServiceCategoriesI>('service_categories');
    }

    async create(dto: CreateCategory): Promise<ServiceCategoriesI> {
        const t = await this.knex.transaction();
        try {
            const category = await this.category
                .insert(dto)
                .returning('*')
                .transacting(t);
            t.commit();
            return category[0];
        } catch (error) {
            t.rollback();
            this.logger.error(error);
            return error;
        }
    }

    async find(query: CategoryQuery): Promise<any> {
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

        const dbQuery = this.category
            .leftJoin(
                'services',
                'services.category_id',
                'service_categories.id',
            )
            .select(
                'service_categories.*',
                this.knex.raw(`COUNT(services.category_id) as servicesCount`),
            )
            .groupBy('service_categories.id');

        const totalCount = (
            await dbQuery.clone().groupBy('service_categories.id').count()
        ).length;

        if (q_uz) {
            dbQuery.where(function () {
                this.whereILike('service_categories.name_uz', `%${q_uz}%`);
            });
        }

        if (q_ru) {
            dbQuery.where(function () {
                this.whereILike('service_categories.name_ru', `%${q_ru}%`);
            });
        }

        const currentCount = (
            await dbQuery.clone().groupBy('service_categories.id').count()
        ).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        const category = await dbQuery;

        return {
            entities: category,
            pageInfo: {
                totalCount,
                currentCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    findOne(id: number): Promise<ServiceCategoriesI> {
        return this.category.where({ id }).first();
    }

    async update(
        id: number,
        update: Partial<Omit<ServiceCategoriesI, 'id'>>,
    ): Promise<ServiceCategoriesI> {
        const t = await this.knex.transaction();
        try {
            const updateCategory = await this.category
                .where({ id })
                .update({ ...update })
                .returning('*')
                .transacting(t);
            t.commit();
            return updateCategory[0];
        } catch (error) {
            t.rollback();
            this.logger.error(error);
            return error;
        }
    }

    remove(id: number): Promise<number> {
        return this.category.where({ id }).del();
    }
}
