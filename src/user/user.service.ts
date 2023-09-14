import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ROLES } from 'src/role/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (candidate) {
            throw new HttpException(
                `User with this email already exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.roleService.getRoleByValue(ROLES.AUTHOR);

        const user = await this.userRepository.save({
            email: createUserDto.email,
            password: createUserDto.password,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            role: role,
            active: null,
        });

        return user;
    }

    async createAdmin(createAdminDto: CreateAdminDto) {
        const user = await this.userRepository.save({
            email: createAdminDto.email,
            password: createAdminDto.password,
            firstName: createAdminDto.firstName,
            lastName: createAdminDto.lastName,
            role: createAdminDto.role,
            active: true,
            canPublic: null,
        });
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getAuthors() {
        const users = await this.userRepository.find({
            where: { roleValue: ROLES.AUTHOR },
        });
        return users;
    }

    async getAdmin() {
        const user = await this.userRepository.findOne({
            where: { roleValue: ROLES.ADMIN },
        });

        return user;
    }

    async getRedactors() {
        const users = await this.userRepository.find({
            where: { roleValue: ROLES.REDACTOR },
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        return user;
    }

    async setPublished(authorId: number) {
        const author = await this.userRepository.findOne({
            where: { id: authorId },
        });

        if (!author) {
            throw new HttpException(`Author not found`, HttpStatus.NOT_FOUND);
        }

        author.canPublic = true;
        await this.userRepository.save(author);
        return author;
    }

    async setRedactor(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
        }

        const role = await this.roleService.getRoleByValue(ROLES.REDACTOR);

        await this.userRepository.save({
            ...user,
            roleValue: role.value,
            role,
            canPublic: null,
        });

        return { status: 200, message: `Role changed` };
    }

    async setAdmin(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
        }

        const role = await this.roleService.getRoleByValue(ROLES.ADMIN);

        await this.userRepository.save({
            ...user,
            roleValue: role.value,
            role,
            canPublic: null,
            active: true,
        });

        return { status: 200, message: `Role changed` };
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        const user = await this.getUserByEmail(changePasswordDto.email);

        user.password = changePasswordDto.newPassword;
        await this.userRepository.save(user);

        return { status: 200, message: `Password changed` };
    }
}
