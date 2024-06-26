import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

// Entities
import { Poem } from '../poem/entity';
import { ChosenVerse } from '../chosenVerse/entity';
import { Prose } from '../prose/entity';
// Utils
import { BaseEntity } from '../../utils/entities';

export type TimePeriodType =
  | 'جاهلي'
  | 'أموي'
  | 'عباسي'
  | 'أندلسي'
  | 'عثماني ومملوكي'
  | 'متأخر وحديث';

/**
 * Poet's Entity
 */
@Entity()
export class Poet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['جاهلي', 'أموي', 'عباسي', 'أندلسي', 'عثماني ومملوكي', 'متأخر وحديث'],
  })
  time_period!: TimePeriodType;

  @Column({
    type: 'varchar',
    length: 500,
  })
  bio!: string;

  @Column('boolean', { default: true })
  reviewed!: boolean;

  @OneToMany((type) => Poem, (poem) => poem.poet)
  @JoinColumn({ name: 'poems' })
  poems!: Poem[];

  @OneToMany((type) => ChosenVerse, (chosenVerse) => chosenVerse.poet)
  @JoinColumn({ name: 'chosenverses' })
  chosenVerses!: ChosenVerse[];

  @OneToMany((type) => Prose, (prose) => prose.poet)
  @JoinColumn({ name: 'proses' })
  proses!: Prose[];
}
