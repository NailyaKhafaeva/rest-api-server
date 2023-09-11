import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOne({
            where: { value: createRoleDto.value },
        });

        if (candidate) {
            throw new HttpException(
                `This role alredy exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.roleRepository.save({
            value: createRoleDto.value,
        });

        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.find();
        return roles;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({
            where: { value: value },
        });
        return role;
    }
}
