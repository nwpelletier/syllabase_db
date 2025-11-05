import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  InternalServerErrorException,
  Logger,
  Query,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './collection.entity';

@Controller('collections')
export class CollectionsController {
  private readonly logger = new Logger(CollectionsController.name);

  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async getAll(
    @Query('composer') composerName?: string,
  ): Promise<Collection[]> {
    try {
      if (composerName) {
        return await this.collectionsService.findByComposer(composerName);
      }
      return await this.collectionsService.findAll();
    } catch (err) {
      this.logger.error('Error fetching all collections', err.stack);
      throw new InternalServerErrorException('Failed to fetch collections');
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    try {
      const collection = await this.collectionsService.findOne(id);
      if (!collection) {
        throw new NotFoundException(`Collection with ID ${id} not found`);
      }
      return collection;
    } catch (err) {
      this.logger.error(`Error fetching collection with ID ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to fetch collection');
    }
  }
}
