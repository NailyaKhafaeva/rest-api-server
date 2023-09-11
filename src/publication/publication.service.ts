import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
    constructor(
        @InjectRepository(Publication)
        private publicationRepository: Repository<Publication>,
    ) {}

    async create(createPublicationDto: CreatePublicationDto) {
        const publication = await this.publicationRepository.save({
            header: createPublicationDto.header,
            content: createPublicationDto.content,
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

        console.log(req.user.id);

        if (req.user.role === 'AUTHOR') {
            if (publication.author !== req.user.id) {
                throw new HttpException(
                    `You dont edit this publication`,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        publication.header = updatePublicationDto.header;
        publication.content = updatePublicationDto.content;

        return publication;
    }

    async getPublicationById(id: number) {
        const publication = await this.publicationRepository.findOne({
            where: { id: id },
        });
        return publication;
    }
}
