import { IsString, IsNumber } from 'class-validator';

export class CreatePieceDto {
  @IsString()
  name: string;

  @IsNumber()
  collectionId: number;
}
