import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { NotificationType } from 'src/common/types/enums';

export class CreateNotificationDto {
    @IsString()
    message: string;

    @IsOptional()
    @IsNumber()
    user_id: number;

    @IsOptional()
    @IsBoolean()
    is_for_all: boolean;

    @IsEnum(NotificationType)
    type: NotificationType;
}
