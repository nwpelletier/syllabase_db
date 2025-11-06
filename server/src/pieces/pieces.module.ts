import { Module, forwardRef } from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { PiecesController } from './pieces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './piece.entity';
import { Collection } from 'src/collections/collection.entity';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Piece, Collection]),
    forwardRef(() => CollectionsModule),
  ],
  controllers: [PiecesController],
  providers: [PiecesService],
})
export class PiecesModule {}
