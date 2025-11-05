// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComposersModule } from './composers/composers.module';
import { Composer } from './composers/composer.entity';
import { CollectionsModule } from './collections/collections.module';
import { Collection } from './collections/collection.entity';
import { PiecesModule } from './pieces/pieces.module';
import { Piece } from './pieces/piece.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'syllabasedb-syllabasedb01.b.aivencloud.com',
        port: 11003,
        username: 'avnadmin',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: configService.get('DB_PASS'),
        database: 'syllabase_db',
        ssl: {
          rejectUnauthorized: false,
        },
        schema: 'public',
        synchronize: false,
        entities: [Composer, Collection, Piece],
      }),
    }),
    ComposersModule,
    CollectionsModule,
    PiecesModule,
  ],
})
export class AppModule {}
