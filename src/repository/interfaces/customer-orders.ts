import { CustomerOrderI, OffsetPaginationI } from 'src/common/types/interfaces';

export type CreateOrder = Omit<CustomerOrderI, 'id'>;
export type OrderQuery = {
    q?: string;
    page?: OffsetPaginationI;
};
export type UpdateOrder = Partial<Omit<CustomerOrderI, 'id'>>;

export default interface CustomerOrdersResposirotyI {
    create(dto: CreateOrder): Promise<CustomerOrderI>;
    find(query: OrderQuery): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, update: UpdateOrder): Promise<CustomerOrderI>;
    remove(id: number): Promise<number>;
}
