import { ApiProperty } from '@nestjs/swagger';
import { Publication } from 'src/publication/publication.entity';
import { Role } from 'src/role/role.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @ApiProperty({ example: '1', description: 'User id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example:
            'e5bf81a2a23c88f3dccb44bc7da68bb5606b653b733bcf9adaa5eb2c8ccf53ab',
        description: 'User hash password',
    })
    @Column()
    password: string;

    @ApiProperty({ example: 'Ivan', description: 'Firstname' })
    @Column()
    firstName: string;

    @ApiProperty({ example: 'Ivanov', description: 'Lastname' })
    @Column({ nullable: true })
    lastName: string;

    @ApiProperty({ example: 'false', description: 'Can user public or not' })
    @Column({ default: false, nullable: true })
    canPublic: boolean;

    @ApiProperty({ example: 'null', description: 'Admin is active or not' })
    @Column({ default: false, nullable: true })
    active: boolean;

    @OneToMany(() => Publication, (publication) => publication.author)
    publications: Publication[];

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ referencedColumnName: 'value' })
    role: Role;

    @ApiProperty({ example: 'AUTHOR', description: 'User role' })
    @Column()
    roleValue: string;
}
