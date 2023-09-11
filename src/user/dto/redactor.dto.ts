import { IsEmail } from 'class-validator';
import { BaseUserDto, isBaseUser } from './base-user.dto';

export class RedactorDto extends BaseUserDto {
    readonly fullName: string;
}

export function isRedactor(obj: any) {
    if (isBaseUser(obj)) {
        if ('fullName' in obj) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
