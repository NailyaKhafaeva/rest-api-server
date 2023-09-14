import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
    @ApiProperty({ example: 'Some haeder', description: 'Publication header' })
    @IsString()
    readonly header: string;

    @ApiProperty({
        example: 'Some content',
        description: 'Publication content',
    })
    @IsString()
    readonly content: string;

    @ApiProperty({
        example: '["image1.png", "image2.png"]',
        description: 'Images',
    })
    @IsOptional()
    @IsArray()
    readonly images: string[];
}
