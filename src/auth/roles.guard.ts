import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredPoles = this.reflector.getAllAndOverride<string>(
                'roles',
                [context.getHandler(), context.getClass()],
            );

            if (!requiredPoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();

            return requiredPoles.includes(req.user.role);
        } catch (e) {
            throw new HttpException(`Forbidden`, HttpStatus.FORBIDDEN);
        }
    }
}
