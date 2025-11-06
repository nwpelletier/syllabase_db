import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Composer } from './composer.entity';
import { CreateComposerDto } from './create-composer.dto';

@Injectable()
export class ComposersService {
  constructor(
    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>,
  ) {}

  findAll(): Promise<Composer[]> {
    return this.composerRepo.find({ relations: ['collections'] });
  }

  async findOne(id: number): Promise<Composer> {
    const composer = await this.composerRepo.findOne({
      where: { id },
      relations: ['collections'],
    });
    if (!composer) throw new NotFoundException(`Composer ${id} not found`);
    return composer;
  }

  create(data: CreateComposerDto): Promise<Composer> {
    const composer = this.composerRepo.create(data);
    return this.composerRepo.save(composer);
  }

  async update(
    id: number,
    data: Partial<CreateComposerDto>,
  ): Promise<Composer> {
    const result = await this.composerRepo.update(id, data);
    if (result.affected === 0)
      throw new NotFoundException(`Composer ${id} not found`);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Composer> {
    const composer = await this.findOne(id);
    return this.composerRepo.remove(composer);
  }
}
