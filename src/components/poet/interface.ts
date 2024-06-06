export interface PoetType {
  _id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
}


export enum ERROR_MSG {
  NOT_AVAILABLE = 'No poet available',
  NOT_FOUND = "Poet's not found",
  NOT_VALID = 'Data for poet is not valid',
}
