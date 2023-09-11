import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from 'src/user/dto/create-client.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp')
    signUp(@Body() userDto: CreateClientDto) {
        return this.authService.signUp(userDto);
    }

    @Post('signIn')
    signIn(@Body() userDto: CreateClientDto) {
        return this.authService.signIn(userDto);
    }
}
