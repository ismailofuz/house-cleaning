import { CustomerOrderI } from 'src/common/types/interfaces';
import CustomerOrdersResposirotyI, {
    CreateOrder,
    OrderQuery,
} from '../interfaces/customer-orders';
import { InjectKnex, Knex } from 'nestjs-knex';
import { PinoLogger } from 'nestjs-pino';

export class CustomerOrderRepository implements CustomerOrdersResposirotyI {
    constructor(
        @InjectKnex() private readonly knex: Knex,
        private readonly logger: PinoLogger,
    ) {}

    private get order() {
        return this.knex<CustomerOrderI>('customer_orders');
    }

    async create(dto: CreateOrder): Promise<CustomerOrderI> {
        const t = await this.knex.transaction();
        try {
            const order = await this.order
                .insert(dto)
                .returning('*')
                .transacting(t);
            t.commit();
            return order[0];
        } catch (error) {
            t.rollback();
            this.logger.error(error);
            return error;
        }
    }

    async find(query: OrderQuery): Promise<any> {
        const { q, page } = query;

        const dbQuery = this.order
            .leftJoin('services', 'services.id', 'customer_orders.service_id')
            .select(
                'customer_orders.phone',
                'customer_orders.name',
                'services.name_uz as service_name_uz',
                'services.name_ru as service_name_ru',
                'services.name_en as service_name_en',
            )
            .groupBy('services.id', 'customer_orders.id');

        const totalCount = (
            await dbQuery.clone().groupBy('customer_orders.id').count()
        ).length;

        if (q) {
            dbQuery.where(function () {
                this.whereILike('customer_orders.name', `%${q}%`);
            });
        }

        const currentCount = (
            await dbQuery.clone().groupBy('customer_orders.id').count()
        ).length;

        if (page) {
            dbQuery.offset(page.offset).limit(page.limit);
        }

        const orders = await dbQuery;

        return {
            entities: orders,
            pageInfo: {
                totalCount,
                currentCount,
                offset: page ? page.offset : null,
                limit: page ? page.limit : null,
            },
        };
    }

    findOne(id: number): Promise<any> {
        return this.order
            .where('customer_orders.id', id)
            .leftJoin('services', 'services.id', 'customer_orders.service_id')
            .select(
                'customer_orders.*',
                'services.name_uz',
                'services.name_ru',
                'services.name_en',
            )
            .first();
    }

    async update(
        id: number,
        update: Partial<Omit<CustomerOrderI, 'id'>>,
    ): Promise<CustomerOrderI> {
        const t = await this.knex.transaction();
        try {
            const updateOrder = await this.order
                .where({ id })
                .update({ ...update })
                .returning('*')
                .transacting(t);
            t.commit();
            return updateOrder[0];
        } catch (error) {
            t.rollback();
            this.logger.error(error);
            return error;
        }
    }

    remove(id: number): Promise<number> {
        return this.order.where({ id }).del();
    }
}
