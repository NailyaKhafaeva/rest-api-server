import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { PublicationService } from 'src/publication/publication.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService,
        private publicationService: PublicationService,
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
        });

        return user;
    }

    // async create(createClientDto: CreateClientDto, roleValue: string) {
    //     const candidate = await this.userRepository.findOne({
    //         where: { email: createClientDto.email },
    //     });

    //     if (candidate) {
    //         throw new HttpException(
    //             `User with this email already exist`,
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }

    //     const role = await this.roleService.getRoleByValue(roleValue);

    //     const user = await this.userRepository.save({
    //         email: createClientDto.email,
    //         password: createClientDto.password,
    //         firstName: createClientDto.firstName,
    //         lastName: createClientDto.lastName,
    //         role: role,
    //     });

    //     return user;
    // }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email },
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
        return author;
    }

    async publicated(publicationId: number, req: any) {
        const user = await this.userRepository.findOne({
            where: { id: req.user.id },
        });

        if (!user.publications.find((p) => p.id === publicationId)) {
            throw new HttpException(`Bad request`, HttpStatus.NOT_FOUND);
        }

        const publication =
            await this.publicationService.getPublicationById(publicationId);

        if (!publication) {
            throw new HttpException(`Bad request`, HttpStatus.NOT_FOUND);
        }

        publication.publicated = true;

        return publication;
    }

    async setRedactor(userId: number) {}
}
