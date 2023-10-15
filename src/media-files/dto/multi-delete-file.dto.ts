import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class MultiDeleteMediaDto {
    @Type(() => String)
    @IsArray()
    path: string[];
}
