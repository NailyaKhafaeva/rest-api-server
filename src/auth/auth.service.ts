import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(userDto: SignInDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async signUp(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                `User with this email already exist`,
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(
            userDto.password,
            process.env.SALT,
        );
        const user = await this.userService.create({
            ...userDto,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {
            id: user.id,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userDto: SignInDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({
            message: 'Uncorrect email or password',
        });
    }
}
