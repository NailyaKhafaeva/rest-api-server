import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto {
    @ApiProperty({
        example: 'New haeder',
        description: 'New publication header',
    })
    @IsOptional()
    @IsString()
    readonly header: string;

    @ApiProperty({
        example: 'New content',
        description: 'New publication content',
    })
    @IsString()
    @IsOptional()
    readonly content: string;

    @ApiProperty({ example: '["newImage.png"]', description: 'New images' })
    @IsOptional()
    @IsArray()
    readonly images: string[];
}
