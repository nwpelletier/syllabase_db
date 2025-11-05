// composer.service.ts
import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.composerRepo.find();
  }

  findOne(id: number) {
    return this.composerRepo.findOneBy({ id });
  }

  create(data: CreateComposerDto) {
    const composer = this.composerRepo.create(data);
    return this.composerRepo.save(composer);
  }
}
