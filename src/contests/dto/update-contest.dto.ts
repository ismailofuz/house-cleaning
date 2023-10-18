import { PartialType } from '@nestjs/swagger';
import { CreateContestDto } from './create-contest.dto';
import { ContestStatus } from 'src/common/types/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateContestDto extends PartialType(CreateContestDto) {
    @IsOptional()
    @IsEnum(ContestStatus)
    status: ContestStatus;
}
