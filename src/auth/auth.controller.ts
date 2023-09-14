import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ApiOperation,
    ApiProperty,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
    @Post('sign-up')
    @UsePipes(ValidationPipe)
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }

    @ApiOperation({ summary: 'Sign up user' })
    @ApiResponse({ status: 200, type: Token })
    @Post('sign-in')
    @UsePipes(ValidationPipe)
    signIn(@Body() userDto: SignInDto) {
        return this.authService.signIn(userDto);
    }
}
