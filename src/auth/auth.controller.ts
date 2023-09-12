import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from 'src/user/dto/create-client.dto';
import {
    ApiOperation,
    ApiProperty,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

class Token {
    @ApiProperty({
        example:
            'e5bf81a2a23c88f3dccb44bc7da68bb5606b653b733bcf9adaa5eb2c8ccf53ab',
        description: 'User hash password',
    })
    token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign up user' })
    @ApiResponse({ status: 200, type: Token })
    @Post('signUp')
    @UsePipes(ValidationPipe)
    signUp(@Body() userDto: CreateClientDto) {
        return this.authService.signUp(userDto);
    }

    @ApiOperation({ summary: 'Sign up user' })
    @ApiResponse({ status: 200, type: Token })
    @Post('signIn')
    @UsePipes(ValidationPipe)
    signIn(@Body() userDto: CreateClientDto) {
        return this.authService.signIn(userDto);
    }
}
