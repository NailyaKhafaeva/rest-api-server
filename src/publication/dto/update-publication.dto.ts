import { IsOptional } from 'class-validator';

export class UpdatePublicationDto {
    @IsOptional()
    readonly header: string;
    @IsOptional()
    readonly content: string;
}
