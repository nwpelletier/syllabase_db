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
import { PiecesService } from './pieces.service';
import { Piece } from './piece.entity';

@Controller('pieces')
export class PiecesController {
  private readonly logger = new Logger(PiecesController.name);
  constructor(private readonly piecesService: PiecesService) {}

  @Get()
  async getAll(
    @Query('composer') composerName?: string,
    @Query('collection') collectionName?: string,
  ): Promise<Piece[]> {
    try {
      if (composerName || collectionName) {
        return await this.piecesService.findByComposerAndCollection(
          composerName,
          collectionName,
        );
      }
      return await this.piecesService.findAll();
    } catch (error) {
      this.logger.error(
        `Error fetching pieces for composer="${composerName}" and collection="${collectionName}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Piece> {
    try {
      const piece = await this.piecesService.findOne(id);
      if (!piece) {
        throw new NotFoundException(`Piece with ID ${id} not found`);
      }
      return piece;
    } catch (error) {
      this.logger.error(`Error fetching piece with ID ${id}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
