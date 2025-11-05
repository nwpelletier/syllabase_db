import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Collection } from 'src/collections/collection.entity';

// 1 . This has to match the table name in the database
@Entity({ name: 'composers' })
export class Composer {
  // 2 . Define the columns in the table, starting with the primary key
  @PrimaryGeneratedColumn()
  id: number;

  // 3 . name property to match database column if different
  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'int', name: 'birth_year' })
  birthYear: number;

  @Column({ type: 'int', name: 'death_year', nullable: true })
  deathYear: number | null;

  @Column({ type: 'varchar', nullable: true })
  nationality: string | null;

  // 4 . Define the one-to-many relationship with Collection
  @OneToMany(() => Collection, (collection) => collection.composer)
  collections: Collection[];
}
