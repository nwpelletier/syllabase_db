import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Collection } from 'src/collections/collection.entity';

@Entity({ name: 'pieces' })
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Collection, (collection) => collection.pieces, {
    nullable: false,
  })
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;
}
