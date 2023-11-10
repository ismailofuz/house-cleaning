import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { NotificationType } from 'src/common/types/enums';

export class QueryNotificationDto {
    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsOptional()
    @IsEnum(NotificationType)
    type?: NotificationType;
}
