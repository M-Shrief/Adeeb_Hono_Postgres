import { PoetType } from '../poet/interface';
import { PoemType } from '../poem/interface';
// utils
import { VerseType } from '../../utils/types';


export interface ChosenVerseType {
  _id: string;
  poet: string | PoetType;
  poem: string | PoemType;
  tags: string;
  verses: VerseType[];
  reviewed: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No chosenVerse available',
  NOT_FOUND = "chosenVerse's not found",
  NOT_VALID = 'Data for chosenVerse is not valid',
  // query
  NUM = 'Accepts numbers only',
}
