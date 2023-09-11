import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    value: string;

    @OneToMany(() => User, (user) => user.role, { onUpdate: 'CASCADE' })
    users: User[];
}
