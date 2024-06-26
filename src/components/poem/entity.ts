import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
// entities
import { Poet } from '../poet/entity';
import { ChosenVerse } from '../chosenVerse/entity';
// Utils
import { VerseType } from '../../utils/types';
import { BaseEntity } from '../../utils/entities';

/**
 * Poem's Entity
 */
@Entity()
export class Poem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  intro!: string;

  @ManyToOne((type) => Poet, (poet) => poet.poems)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @OneToMany((type) => ChosenVerse, (chosenVerse) => chosenVerse.poem)
  @JoinColumn({ name: 'chosenverses' })
  chosenVerses!: ChosenVerse[];

  @Column('jsonb', { nullable: false })
  verses!: VerseType[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}
