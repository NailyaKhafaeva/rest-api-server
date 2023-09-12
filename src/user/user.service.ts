import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { PublicationService } from 'src/publication/publication.service';
import { RoleService } from 'src/role/role.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService,
    ) {}

    async create(createClientDto: CreateClientDto) {
        const candidate = await this.userRepository.findOne({
            where: { email: createClientDto.email },
        });

        if (candidate) {
            throw new HttpException(
                `User with this email already exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.roleService.getRoleByValue('AUTHOR');

        const user = await this.userRepository.save({
            email: createClientDto.email,
            password: createClientDto.password,
            firstName: createClientDto.firstName,
            lastName: createClientDto.lastName,
            role: role,
            active: null,
        });

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getAuthors() {
        const users = await this.userRepository.find({
            where: { roleValue: 'AUTHOR' },
        });
        return users;
    }

    async getRedactors() {
        const users = await this.userRepository.find({
            where: { roleValue: 'REDACTOR' },
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

        const role = await this.roleService.getRoleByValue('REDACTOR');

        await this.userRepository.save({
            ...user,
            roleValue: role.value,
            role,
            canPublic: null,
        });
    }

    async setAdmin(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
        }

        const role = await this.roleService.getRoleByValue('ADMIN');

        await this.userRepository.save({
            ...user,
            roleValue: role.value,
            role,
            canPublic: null,
            active: true,
        });
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        const user = await this.getUserByEmail(changePasswordDto.email);

        user.password = changePasswordDto.newPassword;
        await this.userRepository.save(user);

        return { status: 200, message: `Password changed` };
    }
}
