import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    UseGuards,
    Request,
    Put,
    Param,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publication } from './publication.entity';

@ApiTags('Publications')
@Controller('publication')
export class PublicationController {
    constructor(private publicationService: PublicationService) {}

    @ApiOperation({ summary: 'Create publication' })
    @ApiResponse({ status: 200, type: Publication })
    @Post()
    @Roles('AUTHOR', 'REDACTOR')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    create(
        @Body() createPublicationDto: CreatePublicationDto,
        @Request() req: any,
    ) {
        return this.publicationService.create(createPublicationDto, req);
    }

    @ApiOperation({ summary: 'Get all publications' })
    @ApiResponse({ status: 200, type: [Publication] })
    @Get('/get-all')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getAll() {
        return this.publicationService.getAll();
    }

    @ApiOperation({ summary: 'Get published publications' })
    @ApiResponse({ status: 200, type: [Publication] })
    @Get('/get-published')
    getPublished() {
        return this.publicationService.getPublished();
    }

    @ApiOperation({ summary: 'Update publication' })
    @ApiResponse({ status: 200 })
    @Put('/:publicationId')
    @Roles('REDACTOR', 'AUTHOR')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
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

    @ApiOperation({ summary: 'Publicate publication' })
    @ApiResponse({ status: 200 })
    @Put('/publicate/:publicationId')
    @Roles('AUTHOR')
    @UseGuards(RolesGuard)
    publicated(
        @Param('publicationId') publicationId: number,
        @Request() req: any,
    ) {
        return this.publicationService.publicated(publicationId, req);
    }

    @Delete()
    delete() {}
}
