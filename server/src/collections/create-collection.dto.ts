import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  catalogue?: string;

  @IsOptional()
  @IsNumber()
  catalogueNumber?: number;

  @IsNumber()
  composerId: number;
}
