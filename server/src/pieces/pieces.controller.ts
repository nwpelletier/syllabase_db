import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PiecesService } from './pieces.service';
import { Piece } from './piece.entity';
import { CreatePieceDto } from './create-piece.dto';

@Controller('pieces')
export class PiecesController {
  private readonly logger = new Logger(PiecesController.name);

  constructor(private readonly piecesService: PiecesService) {}

  // GET /pieces?composer=...&collection=...
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

  // GET /pieces/:id
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

  // POST /pieces
  @Post()
  async create(@Body() data: CreatePieceDto): Promise<Piece> {
    try {
      return await this.piecesService.create(data);
    } catch (error) {
      this.logger.error('Error creating piece', error.stack);
      throw new InternalServerErrorException();
    }
  }

  // PUT /pieces/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreatePieceDto>,
  ): Promise<Piece> {
    try {
      return await this.piecesService.update(id, data);
    } catch (error) {
      this.logger.error(`Error updating piece with ID ${id}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  // DELETE /pieces/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Piece> {
    try {
      return await this.piecesService.remove(id);
    } catch (error) {
      this.logger.error(`Error deleting piece with ID ${id}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
