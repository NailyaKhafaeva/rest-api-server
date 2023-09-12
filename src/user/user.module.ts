import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from 'src/publication/publication.entity';
import { Role } from 'src/role/role.entity';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Publication]),
        forwardRef(() => AuthModule),
        RoleModule,
    ],

    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
