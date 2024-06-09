import { PoetType } from '../poet/interface';

export interface ProseType {
  _id: string;
  poet: string | PoetType;
  tags: string;
  qoute: string;
  reviewed: boolean;
}

export enum ERROR_MSG {
  NOT_AVAILABLE = 'No prose available',
  NOT_FOUND = "Prose's not found",
  NOT_VALID = 'Data for prose is not valid',
  // Query
  NUM = 'Accepts numbers only',
}
