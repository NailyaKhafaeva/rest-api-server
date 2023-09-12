import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'user email' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'user password' })
    @IsString()
    readonly password: string;

    @ApiProperty({ example: 'Ivan', description: 'Firstname' })
    @IsString()
    readonly firstName: string;

    @ApiProperty({ example: 'Ivanov', description: 'Lastname' })
    @IsString()
    readonly lastName: string;
}
