import { ContestI, OffsetPaginationI } from 'src/common/types/interfaces';
import { CreateContestDto } from 'src/contests/dto/create-contest.dto';
import { UpdateContestDto } from 'src/contests/dto/update-contest.dto';

export type CreateContest = CreateContestDto;
export type UpdateContest = UpdateContestDto;
export type ContestQuery = {
    q?: string;
    page?: OffsetPaginationI;
};

export default interface ContestsRepositoryI {
    create(dto: CreateContest): Promise<ContestI>;
    update(id: number, dto: UpdateContest): Promise<number>;
    find(query: ContestQuery): Promise<ContestI[]>;
    findOne(id: number): Promise<ContestI>;
    delete(id: number): Promise<number>;
}
