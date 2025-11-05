import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ComposersService } from './composers.service';
import { Composer } from './composer.entity';
import { CreateComposerDto } from './create-composer.dto';

@Controller('composers')
export class ComposersController {
  constructor(private readonly composersService: ComposersService) {}

  @Get()
  getAll(): Promise<Composer[]> {
    return this.composersService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Composer> {
    const composer = await this.composersService.findOne(+id);
    if (!composer) {
      throw new NotFoundException(`Composer with id ${id} not found`);
    }
    return composer;
  }

  @Post()
  create(@Body() data: CreateComposerDto): Promise<Composer> {
    return this.composersService.create(data);
  }
}
