import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PublicationModule } from './publication/publication.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { Publication } from './publication/publication.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            entities: [User, Role, Publication],
            synchronize: true,
            autoLoadEntities: true,
        }),
        PublicationModule,
        RoleModule,
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
