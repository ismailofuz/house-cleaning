import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class DeleteUserDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'It is password of user',
    })
    @IsString()
    password: string;
}
