import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'user email' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'new user password' })
    @IsString()
    readonly newPassword: string;
}
