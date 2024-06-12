import { VerseType } from '../../utils/types';
import { PoetType } from '../poet/interface';

export interface PoemType {
  _id: string;
  intro: string;
  poet: string | PoetType;
  verses: VerseType[];
  reviewed: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poem available',
  NOT_FOUND = "Poem's not found",
  NOT_VALID = 'Data for poem is not valid',
}
