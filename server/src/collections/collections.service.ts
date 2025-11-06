import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './create-collection.dto';
import { Composer } from 'src/composers/composer.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,

    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>,
  ) {}

  findAll(): Promise<Collection[]> {
    return this.collectionRepo.find({ relations: ['composer'] });
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionRepo.findOne({
      where: { id },
      relations: ['composer'],
    });
    if (!collection) {
      throw new NotFoundException(`Collection with id ${id} not found`);
    }
    return collection;
  }

  async findByComposer(composerName: string): Promise<Collection[]> {
    const query = this.collectionRepo
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.composer', 'composer');

    if (composerName) {
      query.andWhere('composer.last_name ILIKE :composerName', {
        composerName: `%${composerName}%`,
      });
    }

    const collections = await query.getMany();

    if (!collections || collections.length === 0) {
      throw new NotFoundException(
        `No collections found for composer matching "${composerName}"`,
      );
    }

    return collections;
  }

  async create(data: CreateCollectionDto): Promise<Collection> {
    const composer = await this.composerRepo.findOneBy({
      id: data.composerId,
    });
    if (!composer) {
      throw new NotFoundException(`Composer ${data.composerId} not found`);
    }

    const collection = this.collectionRepo.create({
      name: data.name,
      catalogue: data.catalogue ?? null,
      catalogueNumber: data.catalogueNumber ?? null,
      composer,
    });

    return await this.collectionRepo.save(collection);
  }

  async update(
    id: number,
    data: Partial<CreateCollectionDto>,
  ): Promise<Collection> {
    let composer: Composer | null = null;
    if (data.composerId !== undefined) {
      composer = await this.composerRepo.findOneBy({ id: data.composerId });
      if (!composer) {
        throw new NotFoundException(`Composer ${data.composerId} not found`);
      }
    }

    const updateData: Partial<Collection> = {
      name: data.name,
      catalogue: data.catalogue,
      catalogueNumber: data.catalogueNumber,
      ...(composer ? { composer } : {}),
    };

    const result = await this.collectionRepo.update(id, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`Collection with id ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<Collection> {
    const collection = await this.findOne(id);
    return this.collectionRepo.remove(collection);
  }
}
