import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Publication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    header: string;

    @Column()
    content: string;

    @Column({ type: 'json', nullable: true })
    images: string[];

    @ManyToOne(() => User, (user) => user.publications)
    @JoinColumn()
    author: User;

    @Column()
    authorId: number;

    @Column({ default: false })
    publicated: boolean;
}
