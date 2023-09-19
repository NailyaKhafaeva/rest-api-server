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
import { ROLES } from 'src/role/role.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Publications')
@Controller('publication')
export class PublicationController {
    constructor(private publicationService: PublicationService) {}

    @ApiOperation({ summary: 'Create publication' })
    @ApiResponse({ status: 200, type: Publication })
    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR, ROLES.REDACTOR)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    create(
        @Body() createPublicationDto: CreatePublicationDto,
        @Request() req: any,
    ) {
        const userId = req.user.id;
        return this.publicationService.create(createPublicationDto, userId);
    }

    @ApiOperation({ summary: 'Get all publications' })
    @ApiResponse({ status: 200, type: [Publication] })
    @Get('/get-all')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.ADMIN)
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
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR, ROLES.REDACTOR)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    updatePublication(
        @Param('publicationId') publicationId: number,
        @Body() updatePublicationDto: UpdatePublicationDto,
        @Request() req: any,
    ) {
        const userId = req.user.id;
        const userRole = req.user.role;
        return this.publicationService.updatePublication(
            publicationId,
            updatePublicationDto,
            userId,
            userRole,
        );
    }

    @ApiOperation({ summary: 'Publicate publication' })
    @ApiResponse({ status: 200 })
    @Put('/publicate/:publicationId')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR)
    @UseGuards(RolesGuard)
    publicated(
        @Param('publicationId') publicationId: number,
        @Request() req: any,
    ) {
        const userId = req.user.id;
        return this.publicationService.publicated(publicationId, userId);
    }

    @ApiOperation({ summary: 'Delete publication' })
    @ApiResponse({ status: 200 })
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR, ROLES.ADMIN)
    @UseGuards(RolesGuard)
    delete(@Param('id') id: number, @Request() req: any) {
        const userId = req.user.id;
        const userRole = req.user.role;
        return this.publicationService.deletePublication(id, userId, userRole);
    }
}
