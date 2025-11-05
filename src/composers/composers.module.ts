import { Module } from '@nestjs/common';
import { ComposersService } from './composers.service';
import { ComposersController } from './composers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composer } from './composer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Composer])],
  controllers: [ComposersController],
  providers: [ComposersService],
})
export class ComposersModule {}
