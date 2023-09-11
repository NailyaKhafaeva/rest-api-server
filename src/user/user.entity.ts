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
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ default: false, nullable: true })
    canPublic: boolean;

    @Column({ default: false, nullable: true })
    active: boolean;

    @OneToMany(() => Publication, (publication) => publication.author)
    publications: Publication[];

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ referencedColumnName: 'value' })
    role: Role;

    @Column()
    roleValue: string;
}
