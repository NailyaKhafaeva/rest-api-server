import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
    @IsString()
    readonly header: string;

    @IsString()
    readonly content: string;

    @IsOptional()
    @IsArray()
    readonly images: string[];
}
