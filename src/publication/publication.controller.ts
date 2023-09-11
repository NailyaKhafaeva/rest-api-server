import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Headers,
    Req,
    Request,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publication')
export class PublicationController {
    constructor(private publicationService: PublicationService) {}

    @Post()
    @Roles('AUTHOR', 'REDACTOR')
    @UseGuards(RolesGuard)
    create(@Body() createPublicationDto: CreatePublicationDto) {
        return this.publicationService.create(createPublicationDto);
    }

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getAll() {
        return this.publicationService.getAll();
    }

    @Get()
    getPublished() {
        return this.publicationService.getPublished();
    }

    @Patch('/:publicationId')
    @Roles('REDACTOR', 'AUTHOR')
    @UseGuards(RolesGuard)
    updatePublication(
        @Param('publicationId') publicationId: number,
        @Body() updatePublicationDto: UpdatePublicationDto,
        @Request() req: any,
    ) {
        return this.publicationService.updatePublication(
            publicationId,
            updatePublicationDto,
            req,
        );
    }

    @Get()
    setPublicated() {}

    @Delete()
    delete() {}
}
