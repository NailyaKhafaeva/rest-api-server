import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { UserService } from 'src/user/user.service';
import { ROLES } from 'src/role/role.entity';

@Injectable()
export class PublicationService {
    constructor(
        @InjectRepository(Publication)
        private publicationRepository: Repository<Publication>,
        private userService: UserService,
    ) {}

    async create(createPublicationDto: CreatePublicationDto, userId: number) {
        const user = await this.userService.getUserById(userId);

        const publication = await this.publicationRepository.save({
            header: createPublicationDto.header,
            content: createPublicationDto.content,
            images: createPublicationDto.images,
            author: user,
        });
        return publication;
    }

    async getAll() {
        const publications = await this.publicationRepository.find();
        return publications;
    }

    async getPublished() {
        const publications = await this.publicationRepository.find({
            where: { publicated: true },
        });
        return publications;
    }

    async updatePublication(
        publicationId: number,
        updatePublicationDto: UpdatePublicationDto,
        userId: number,
        userRole: string,
    ) {
        if (userRole === ROLES.REDACTOR) {
            const publication = await this.publicationRepository.findOne({
                where: { id: publicationId },
            });

            if (!publication) {
                throw new HttpException(
                    `Publicaton not found`,
                    HttpStatus.NOT_FOUND,
                );
            }

            publication.header = updatePublicationDto.header;
            publication.content = updatePublicationDto.content;
            await this.publicationRepository.save(publication);

            return publication;
        }

        if (userRole === ROLES.REDACTOR) {
            const publication = await this.publicationRepository.findOne({
                where: { id: publicationId, authorId: userId },
            });

            if (!publication) {
                throw new HttpException(
                    `Publicaton not found`,
                    HttpStatus.NOT_FOUND,
                );
            }

            publication.header = updatePublicationDto.header;
            publication.content = updatePublicationDto.content;
            await this.publicationRepository.save(publication);

            return publication;
        }
    }

    async getPublicationById(id: number) {
        const publication = await this.publicationRepository.findOne({
            where: { id: id },
        });
        return publication;
    }

    async publicated(publicationId: number, userId: number) {
        const user = await this.userService.getUserById(userId);

        if (user.canPublic === false) {
            throw new HttpException(
                `You can't publicate`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const publication = await this.publicationRepository.findOne({
            where: { id: publicationId, authorId: userId },
        });

        if (!publication) {
            throw new HttpException(
                `Publication not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        publication.publicated = true;
        await this.publicationRepository.save(publication);

        return publication;
    }

    async deletePublication(id: number, userId: number, userRole: string) {
        const publication = await this.publicationRepository.findOne({
            where: { id: id },
        });

        if (!publication) {
            throw new HttpException(
                `Publication not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        if (userRole === ROLES.ADMIN) {
            await this.publicationRepository.delete(publication.id);

            return { status: 200, message: `Publication successfully deleted` };
        }

        if (publication.authorId !== userId) {
            throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
        }

        await this.publicationRepository.delete(publication.id);

        return { status: 200, message: `Publication successfully deleted` };
    }
}
