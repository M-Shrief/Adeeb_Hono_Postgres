import { ChosenVerseDB } from './repository';
import { ChosenVerseType } from './interface';

export const ChosenVerseService = {
  async getAllWithPoet(): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerseDB.getAllWithPoet();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getRandomWithPoet(num: number): Promise<ChosenVerseType[] | false> {
    const chosenVerses = await ChosenVerseDB.getRandomWithPoet(num);

    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getOneWithPoet(id: string): Promise<ChosenVerseType | false> {
    const chosenVerse = await ChosenVerseDB.getOneWithPoet(id);
    if (!chosenVerse) return false;
    return chosenVerse;
  },

  async post(
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const newChosenVerse = await ChosenVerseDB.post(chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async postMany(
    chosenVersesData: ChosenVerseType[],
  ): Promise<ChosenVerseType[] | false> {
    const newChosenVerses = await ChosenVerseDB.postMany(chosenVersesData);
    if (newChosenVerses.length == 0) return false;
    return newChosenVerses;
  },

  async update(
    id: string,
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | false> {
    const newChosenVerse = await ChosenVerseDB.update(id, chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async delete(id: string): Promise<ChosenVerseType | false> {
    const poet = await ChosenVerseDB.delete(id);
    if (!poet) return false;
    return poet;
  },
};
