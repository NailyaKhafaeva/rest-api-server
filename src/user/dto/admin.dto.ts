import { IsEmail } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class AdminDto extends BaseUserDto {
    readonly userName: string;
    readonly active: boolean;
}

export function isAdmin(obj: any) {}
