import { forwardRef, Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Composer } from 'src/composers/composer.entity';
import { ComposersModule } from 'src/composers/composers.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Collection, Composer]),
    forwardRef(() => ComposersModule),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
