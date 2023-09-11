import { RedactorDto } from './redactor.dto';

export class AuthorDto extends RedactorDto {
    readonly canPublic: boolean;
}
