import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piece } from './piece.entity';

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepo: Repository<Piece>,
  ) {}

  findAll(): Promise<Piece[]> {
    return this.pieceRepo.find({
      relations: ['collection', 'collection.composer'],
    });
  }
  findOne(id: number): Promise<Piece | null> {
    return this.pieceRepo.findOne({
      where: { id },
      relations: ['collection', 'collection.composer'],
    });
  }
}
