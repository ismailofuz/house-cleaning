import { Type } from 'class-transformer';
import {
    IsOptional,
    IsString,
    MinLength,
    ValidateNested,
} from 'class-validator';
import {
    OffsetPaginationDto,
    offsetDefault,
} from 'src/common/dto/offset-pagination.dto';

export class QueryServiceDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    q?: string;

    @Type(() => OffsetPaginationDto)
    @ValidateNested({ each: true })
    page?: OffsetPaginationDto = offsetDefault;
}
