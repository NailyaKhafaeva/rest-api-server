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
import { CreateClientDto } from './dto/create-client.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import {
    ApiOperation,
    ApiProperty,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Get authors' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @Roles('AUTHOR', 'ADMIN')
    @UseGuards(RolesGuard)
    getAuthors() {
        return this.userService.getAuthors();
    }

    @ApiOperation({ summary: 'Get redactors' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    @Roles('AUTHOR', 'ADMIN')
    @UseGuards(RolesGuard)
    getRedactors() {
        return this.userService.getRedactors();
    }

    @ApiOperation({ summary: 'Set can public true' })
    @ApiResponse({ status: 200, type: User })
    @Put('/set-published/:authorId')
    @Roles('REDACTOR')
    @UseGuards(RolesGuard)
    setPublished(@Param('authorId') authorId: number) {
        return this.userService.setPublished(authorId);
    }

    @ApiOperation({ summary: 'Set redactor' })
    @ApiResponse({ status: 200, type: User })
    @Put('/set-redactor/:userId')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    setRedactor(@Param('userId') userId: number) {
        return this.userService.setRedactor(userId);
    }

    @ApiOperation({ summary: 'Set admin' })
    @ApiResponse({ status: 200, type: User })
    @Put('/set-admin/:userId')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    setAdmin(@Param('userId') userId: number) {
        return this.userService.setAdmin(userId);
    }

    @ApiOperation({ summary: 'Change password' })
    @ApiResponse({ status: 200 })
    @Put('/change-password/:userId')
    @Roles('AUTHOR')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    changePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return this.userService.changePassword(changePasswordDto);
    }
}
