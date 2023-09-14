import { Role } from 'src/role/role.entity';

export class CreateAdminDto {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: Role;
}
