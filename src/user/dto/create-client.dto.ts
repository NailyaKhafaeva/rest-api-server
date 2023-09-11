import { IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsEmail()
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
}
