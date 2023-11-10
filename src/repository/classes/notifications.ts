import { NotificationI } from 'src/common/types/interfaces';
import NotificationsRepositoryI, {
    CreateNotification,
    QueryNotification,
} from '../interfaces/notifications';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Status } from 'src/common/types/enums';

export class NotificationsRepository implements NotificationsRepositoryI {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    private get notification() {
        return this.knex<NotificationI>('notifications');
    }

    async create(create: CreateNotification): Promise<NotificationI> {
        return this.notification
            .insert(create)
            .returning('*')
            .then((notification) => {
                return notification[0];
            });
    }

    async findByUserId(query: QueryNotification): Promise<any> {
        const { user_id, type } = query;
        await this.notification
            .where({ user_id: query.user_id })
            .update({ is_read: true });
        return this.notification
            .where({ user_id, type, status: Status.ACTIVE })
            .where({ is_for_all: true })
            .select('id', 'message', 'created_at', 'is_read')
            .orderBy('created_at', 'desc')
            .groupBy('id');
    }

    async findUnreadCount(id: number): Promise<any> {
        const userNotifications = this.notification.where({
            user_id: id,
        });

        const unread_count = (
            await userNotifications
                .clone()
                .where({ is_read: false })
                .groupBy('notifications.id')
                .count()
        ).length;

        return { unread_count };
    }

    update(
        id: number,
        update: Partial<
            Omit<NotificationI, 'id' | 'created_at' | 'updated_at'>
        >,
    ): Promise<NotificationI> {
        return this.notification.where({ id }).update({ ...update });
    }

    delete(id: number): Promise<NotificationI> {
        return this.notification
            .where({ id })
            .update({ status: Status.DELETED });
    }
}
