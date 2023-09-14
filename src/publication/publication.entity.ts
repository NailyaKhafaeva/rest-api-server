import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('publications')
export class Publication {
    @ApiProperty({ example: '1', description: 'Publication id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Some haeder', description: 'Publication header' })
    @Column()
    header: string;

    @ApiProperty({
        example: 'Some content',
        description: 'Publication content',
    })
    @Column()
    content: string;

    @ApiProperty({
        example: '["image1.png", "image2.png"]',
        description: 'Images',
    })
    @Column({ type: 'json', nullable: true })
    images: string[];

    @ManyToOne(() => User, (user) => user.publications)
    @JoinColumn()
    author: User;

    @ApiProperty({
        example: '1',
        description: 'Author id',
    })
    @Column()
    authorId: number;

    @ApiProperty({
        example: 'false',
        description: 'Publicated flag',
    })
    @Column({ default: false })
    publicated: boolean;
}
