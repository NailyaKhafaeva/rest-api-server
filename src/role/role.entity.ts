import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    @ApiProperty({ example: '1', description: 'Role id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'AUTHOR', description: 'Role value' })
    @Column({ nullable: false, unique: true })
    value: string;

    @OneToMany(() => User, (user) => user.role, { onUpdate: 'CASCADE' })
    users: User[];
}
