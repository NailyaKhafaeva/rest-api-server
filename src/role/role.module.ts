import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Publication } from 'src/publication/publication.entity';
import { User } from 'src/user/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Publication]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
    ],
    providers: [RoleService],
    controllers: [RoleController],
    exports: [RoleService],
})
export class RoleModule {}
