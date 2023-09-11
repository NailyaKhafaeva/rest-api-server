import { Module, forwardRef } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Role } from 'src/role/role.entity';
import { Publication } from './publication.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Publication]),
        forwardRef(() => AuthModule),
        RoleModule,
        UserModule,
    ],
    controllers: [PublicationController],
    providers: [PublicationService],
    exports: [PublicationService],
})
export class PublicationModule {}
