import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PublicationModule } from './publication/publication.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ROLES } from './role/role.entity';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcryptjs';
import { RoleService } from './role/role.service';
import { dataSourceOptions } from 'db/data-source';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        PublicationModule,
        RoleModule,
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(
        private userService: UserService,
        private roleService: RoleService,
    ) {}

    async onModuleInit() {
        const admin = await this.userService.getAdmin();

        const role = await this.roleService.getRoleByValue(ROLES.ADMIN);

        if (!role) {
            const adminRole = await this.roleService.create({
                value: ROLES.ADMIN,
            });

            await this.roleService.create({
                value: ROLES.AUTHOR,
            });
            await this.roleService.create({
                value: ROLES.REDACTOR,
            });

            const hashPassword = await bcrypt.hash(
                'admin123',
                Number(process.env.SALT),
            );

            const newAdmin = {
                email: 'admin@gmail.com',
                password: hashPassword,
                firstName: 'admin',
                lastName: 'adminovich',
                role: adminRole,
            };

            await this.userService.createAdmin(newAdmin);

            console.log('ADMIN created');
        }
    }
}
