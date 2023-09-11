import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PublicationService {
    constructor(
        @InjectRepository(Publication)
        private publicationRepository: Repository<Publication>,
        private userService: UserService,
    ) {}

    async create(createPublicationDto: CreatePublicationDto, req: any) {
        const user = await this.userService.getUserById(req.user.id);

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
        req: any,
    ) {
        const publication = await this.publicationRepository.findOne({
            where: { id: publicationId },
        });

        if (!publication) {
            throw new HttpException(
                `Publicaton not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        const user = await this.userService.getUserById(req.user.id);

        if (user.roleValue === 'AUTHOR') {
            if (publication.authorId !== user.id) {
                throw new HttpException(
                    `You dont edit this publication`,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        publication.header = updatePublicationDto.header;
        publication.content = updatePublicationDto.content;
        await this.publicationRepository.save(publication);

        return publication;
    }

    async getPublicationById(id: number) {
        const publication = await this.publicationRepository.findOne({
            where: { id: id },
        });
        return publication;
    }

    async publicated(publicationId: number, req: any) {
        const user = await this.userService.getUserById(req.user.id);

        if (user.canPublic === false) {
            throw new HttpException(
                `You can't publicate`,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!user.publications.find((p) => p.id === publicationId)) {
            throw new HttpException(
                `Publication not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        const publication = await this.publicationRepository.findOne({
            where: { id: publicationId },
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
}
