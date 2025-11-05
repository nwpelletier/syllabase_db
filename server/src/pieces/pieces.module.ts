import { Module } from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { PiecesController } from './pieces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './piece.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Piece])],
  controllers: [PiecesController],
  providers: [PiecesService],
})
export class PiecesModule {}
