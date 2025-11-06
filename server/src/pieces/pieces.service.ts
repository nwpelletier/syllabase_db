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
  ) {}

  // Fetch all pieces with collection and composer
  findAll(): Promise<Piece[]> {
    return this.pieceRepo.find({
      relations: ['collection', 'collection.composer'],
    });
  }

  // Fetch a single piece by id
  findOne(id: number): Promise<Piece | null> {
    return this.pieceRepo.findOne({
      where: { id },
      relations: ['collection', 'collection.composer'],
    });
  }

  // Filter pieces by composer and/or collection
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

  // Create a new piece
  async create(data: CreatePieceDto): Promise<Piece> {
    const piece = this.pieceRepo.create({
      name: data.name,
      collection: { id: data.collectionId } as Collection, // partial entity
    });
    return this.pieceRepo.save(piece);
  }

  // Update a piece (for now, only name)
  async update(id: number, data: Partial<CreatePieceDto>): Promise<Piece> {
    const piece = await this.findOne(id);
    if (!piece) {
      throw new NotFoundException(`Piece with id ${id} not found`);
    }

    if (data.name !== undefined) piece.name = data.name;

    return this.pieceRepo.save(piece);
  }

  // Remove a piece
  async remove(id: number): Promise<Piece> {
    const piece = await this.findOne(id);
    if (!piece) {
      throw new NotFoundException(`Piece with id ${id} not found`);
    }
    return this.pieceRepo.remove(piece);
  }
}
