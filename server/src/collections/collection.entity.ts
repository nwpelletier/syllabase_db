import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Composer } from 'src/composers/composer.entity';
import { Piece } from 'src/pieces/piece.entity';

@Entity({ name: 'collections' })
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  catalogue: string | null;

  @Column({ name: 'catalogue_number', type: 'int', nullable: true })
  catalogueNumber: number | null;

  // Define the many-to-one relationship with Composer
  @ManyToOne(() => Composer, (composer) => composer.collections, {
    nullable: false,
  })

  // IMPORTANT: This name has to match the foreign key column in the database
  @JoinColumn({ name: 'composer_id' })
  composer: Composer;

  @OneToMany(() => Piece, (piece) => piece.collection)
  pieces: Piece[];
}
