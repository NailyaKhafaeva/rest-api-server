import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
    Put,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // @Post()
    // create(@Body() createClientDto: CreateClientDto) {
    //     return this.userService.create(createClientDto);
    // }

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Put('/:authorId')
    @Roles('REDACTOR')
    @UseGuards(RolesGuard)
    setPublished(@Param('authorId') authorId: number) {
        return this.userService.setPublished(authorId);
    }

    @Put('/:userId')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    setRedactor(@Param('userId') userId: number) {
        return this.userService.setRedactor(userId);
    }

    @Put('/:userId')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    setAdmin(@Param('userId') userId: number) {
        return this.userService.setAdmin(userId);
    }
}
