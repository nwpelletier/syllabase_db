import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
  ) {}

  // Fetch all collections with composer included
  findAll(): Promise<Collection[]> {
    return this.collectionRepo.find({ relations: ['composer'] });
  }

  // Fetch a single collection by ID with composer included
  findOne(id: number): Promise<Collection | null> {
    return this.collectionRepo.findOne({
      where: { id },
      relations: ['composer'],
    });
  }
}
