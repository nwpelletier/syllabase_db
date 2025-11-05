// composer/dto/create-composer.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateComposerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  birthYear: number;

  @IsOptional()
  @IsNumber()
  deathYear?: number;

  @IsOptional()
  @IsString()
  nationality?: string;
}
