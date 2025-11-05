import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { Piece } from './piece.entity';

@Controller('pieces')
export class PiecesController {
  private readonly logger = new Logger(PiecesController.name);
  constructor(private readonly piecesService: PiecesService) {}

  @Get()
  async getAll(): Promise<Piece[]> {
    try {
      return await this.piecesService.findAll();
    } catch (error) {
      this.logger.error('Error fetching all pieces', error.stack);
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
