import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto {
    @IsOptional()
    @IsString()
    readonly header: string;

    @IsString()
    @IsOptional()
    readonly content: string;

    @IsOptional()
    @IsArray()
    readonly images: string[];
}
