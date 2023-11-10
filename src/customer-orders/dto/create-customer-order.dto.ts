import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { OrderStatus } from 'src/common/types/enums';

export class CreateCustomerOrderDto {
    @ApiProperty({ description: 'Buyurtmachining telefon nomeri' })
    @IsPhoneNumber('UZ')
    phone: string;

    @ApiProperty({ description: 'Buyurtmachining ismi' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Buyurtmaching manzili' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Buyurtmachi tanlagan servis' })
    @IsNumber()
    service_id: number;
}
