import {
    CanActivate,
    ExecutionContext,
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
            const authHeader = req.headers?.authorization;

            if (authHeader) {
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];

                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({
                        message: `User unauthorized`,
                    });
                }

                const user = this.jwtService.verify(token);

                const u = await this.userService.getUserById(user.id);
                req.user = user;
                return requiredPoles.includes(u.roleValue);
            } else {
                throw new Error(`Headers doesn't exist`);
            }
        } catch (e) {
            throw new UnauthorizedException({
                message: `User unauthorized`,
            });
        }
    }
}
