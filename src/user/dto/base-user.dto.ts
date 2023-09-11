import { IsEmail } from 'class-validator';

export class BaseUserDto {
    readonly email: string;
    readonly password: string;
}

export function isBaseUser(obj: any): obj is BaseUserDto {
    if ('email' in obj && 'password' in obj) {
        return true;
    } else {
        return false;
    }
}
