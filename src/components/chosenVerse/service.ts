import { ChosenVerseDB } from './repository';
import { ChosenVerse } from './entity';

export const ChosenVerseService = {
  async getAllWithPoet(): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getAllWithPoet();
    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getRandomWithPoet(num: number): Promise<ChosenVerse[] | false> {
    const chosenVerses = await ChosenVerseDB.getRandomWithPoet(num);

    if (chosenVerses.length === 0) return false;
    return chosenVerses;
  },

  async getOneWithPoet(id: string): Promise<ChosenVerse | false> {
    const chosenVerse = await ChosenVerseDB.getOneWithPoet(id);
    if (!chosenVerse) return false;
    return chosenVerse;
  },

  async post(
    chosenVerseData: ChosenVerse,
  ): Promise<ChosenVerse | false> {
    const newChosenVerse = await ChosenVerseDB.post(chosenVerseData);
    if (!newChosenVerse) return false;
    return newChosenVerse;
  },

  async postMany(
    chosenVersesData: ChosenVerse[],
  ): Promise<ChosenVerse[] | false> {
    const newChosenVerses = await ChosenVerseDB.postMany(chosenVersesData);
    if (newChosenVerses.length == 0) return false;
    return newChosenVerses;
  },

  async update(
    id: string,
    chosenVerseData: ChosenVerse,
  ): Promise<number | false> {
    const newChosenVerse = await ChosenVerseDB.update(id, chosenVerseData);
    if (!newChosenVerse.affected) return false;
    return newChosenVerse.affected;
  },

  async delete(id: string): Promise<number | false> {
    const poet = await ChosenVerseDB.delete(id);
    if (!poet.affected) return false;
    return poet.affected;
  },
};
