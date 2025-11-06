import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composer } from './composer.entity';
import { ComposersService } from './composers.service';
import { ComposersController } from './composers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Composer])],
  providers: [ComposersService],
  controllers: [ComposersController],
  exports: [ComposersService],
})
export class ComposersModule {}
