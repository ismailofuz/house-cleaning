import { NotificationType } from 'src/common/types/enums';
import { NotificationI } from 'src/common/types/interfaces';

export type CreateNotification = Omit<
    NotificationI,
    'id' | 'created_at' | 'updated_at'
>;
export type QueryNotification = { user_id?: number; type?: NotificationType };
export type UpdateNotification = Partial<
    Omit<NotificationI, 'id' | 'created_at' | 'updated_at'>
>;
export default interface NotificationsRepositoryI {
    create(create: CreateNotification): Promise<NotificationI>;
    findByUserId(query: QueryNotification): Promise<NotificationI[]>;
    findUnreadCount(id: number): Promise<NotificationI>;
    update(id: number, update: UpdateNotification): Promise<NotificationI>;
    delete(id: number): Promise<NotificationI>;
}
