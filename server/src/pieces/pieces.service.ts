import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piece } from './piece.entity';
import { CreatePieceDto } from './create-piece.dto';
import { Collection } from 'src/collections/collection.entity';

@Injectable()
export class PiecesService {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepo: Repository<Piece>,

    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
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

  async findByComposerAndCollection(
    composerName?: string,
    collectionName?: string,
  ): Promise<Piece[]> {
    const query = this.pieceRepo
      .createQueryBuilder('piece')
      .leftJoinAndSelect('piece.collection', 'collection')
      .leftJoinAndSelect('collection.composer', 'composer');

    if (composerName) {
      query.andWhere('composer.last_name ILIKE :composerName', {
        composerName: `%${composerName}%`,
      });
    }

    if (collectionName) {
      query.andWhere('collection.name ILIKE :collectionName', {
        collectionName: `%${collectionName}%`,
      });
    }

    return query.getMany();
  }
}
