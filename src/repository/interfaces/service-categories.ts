import {
    OffsetPaginationI,
    ServiceCategoriesI,
} from 'src/common/types/interfaces';

export type CreateCategory = Omit<ServiceCategoriesI, 'id'>;
export type CategoryQuery = {
    q?: string;
    page?: OffsetPaginationI;
};
export type UpdateCategory = Partial<Omit<ServiceCategoriesI, 'id'>>;

export default interface ServiceCategoriesRepositoryI {
    create(dto: CreateCategory): Promise<ServiceCategoriesI>;
    find(query: CategoryQuery): Promise<any>;
    findOne(id: number): Promise<ServiceCategoriesI>;
    update(id: number, update: UpdateCategory): Promise<ServiceCategoriesI>;
    remove(id: number): Promise<number>;
}
