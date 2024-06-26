import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Entities
import { Poet } from '../poet/entity';
import { Poem } from '../poem/entity';
// Types
import { BaseEntity } from '../../utils/entities';
import { VerseType } from '../../utils/types';

/**
 * ChosenVerse's Entity
 */
@Entity()
export class ChosenVerse extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Poet, (poet) => poet.chosenVerses)
  @JoinColumn({ name: 'poet' })
  poet!: Poet;

  @ManyToOne((type) => Poem, (poem) => poem.chosenVerses)
  @JoinColumn({ name: 'poem' })
  poem!: Poem;

  @Column({ type: 'varchar', length: 50 })
  tags!: string;

  @Column('jsonb', { nullable: false })
  verses!: VerseType[];

  @Column({ type: 'boolean', default: true })
  reviewed!: boolean;
}