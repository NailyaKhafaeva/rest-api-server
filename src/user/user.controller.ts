import {
    Body,
    Controller,
    Get,
    Param,
    UseGuards,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ROLES } from 'src/role/role.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // @Post()
    // create(@Body() createClientDto: CreateClientDto) {
    //     return this.userService.create(createClientDto);
    // }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Get authors' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR, ROLES.ADMIN)
    @UseGuards(RolesGuard)
    getAuthors() {
        return this.userService.getAuthors();
    }

    @ApiOperation({ summary: 'Get redactors' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR, ROLES.ADMIN)
    @UseGuards(RolesGuard)
    getRedactors() {
        return this.userService.getRedactors();
    }

    @ApiOperation({ summary: 'Set can public true' })
    @ApiResponse({ status: 200, type: User })
    @Put('/set-published/:authorId')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.ADMIN, ROLES.REDACTOR)
    @UseGuards(RolesGuard)
    setPublished(@Param('authorId') authorId: number) {
        return this.userService.setPublished(authorId);
    }

    @ApiOperation({ summary: 'Set redactor' })
    @ApiResponse({ status: 200 })
    @Put('/set-redactor/:userId')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    setRedactor(@Param('userId') userId: number) {
        return this.userService.setRedactor(userId);
    }

    @ApiOperation({ summary: 'Set admin' })
    @ApiResponse({ status: 200 })
    @Put('/set-admin/:userId')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.ADMIN)
    @UseGuards(RolesGuard)
    setAdmin(@Param('userId') userId: number) {
        return this.userService.setAdmin(userId);
    }

    @ApiOperation({ summary: 'Change password' })
    @ApiResponse({ status: 200 })
    @Put('/change-password/:userId')
    @UseGuards(JwtAuthGuard)
    @Roles(ROLES.AUTHOR)
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return this.userService.changePassword(changePasswordDto);
    }
}
