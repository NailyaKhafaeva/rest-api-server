import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ example: 'AUTHOR', description: 'Role value' })
    @IsString()
    readonly value: string;
}
