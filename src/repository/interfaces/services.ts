import { OffsetPaginationI, ServicesI } from 'src/common/types/interfaces';

export type CreateService = Omit<ServicesI, 'id'>;
export type ServicesQuery = {
    q?: string;
    page?: OffsetPaginationI;
};
export type UpdateService = Partial<Omit<ServicesI, 'id'>>;

export default interface ServicesRepositoryI {
    create(dto: CreateService): Promise<ServicesI>;
    find(query: ServicesQuery): Promise<any>;
    findOne(id: number): Promise<ServicesI>;
    update(id: number, update: UpdateService): Promise<ServicesI>;
    remove(id: number): Promise<number>;
}
