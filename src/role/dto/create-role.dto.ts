import { IsString } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    readonly value: string;
}
