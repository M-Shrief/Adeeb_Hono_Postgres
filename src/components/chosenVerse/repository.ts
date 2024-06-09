import { ChosenVerse } from './model';
import { ChosenVerseType } from './interface';

export const ChosenVerseDB = {
  async getAllWithPoet(): Promise<ChosenVerseType[]> {
    return await ChosenVerse.find(
      {},
      { reviewed: 1, tags: 1, verses: 1, poet: 1, poem: 1 },
    ).populate('poet', 'name');
  },

  async getRandomWithPoet(num: number): Promise<ChosenVerseType[]> {
    return await ChosenVerse.aggregate([
      { $sample: { size: num } },
      {
        $unset: [
          'updatedAt',
          'createdAt',
          'tags',
          'poet',
          'poem',
          'reviewed',
          '__v',
        ],
      },
    ]);
  },

  async getOneWithPoet(id: string): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findById(id, {
      reviewed: 1,
      tags: 1,
      verses: 1,
      poet: 1,
      poem: 1,
    }).populate('poet', 'name');
  },

  async post(chosenVerseData: ChosenVerseType): Promise<ChosenVerseType> {
    const chosenVerse = new ChosenVerse({
      poet: chosenVerseData.poet,
      poem: chosenVerseData.poem,
      tags: chosenVerseData.tags,
      verses: chosenVerseData.verses,
      reviewed: chosenVerseData.reviewed,
    });
    return await chosenVerse.save();
  },

  async postMany(
    chosenVersesData: ChosenVerseType[],
  ): Promise<ChosenVerseType[]> {
    return await ChosenVerse.insertMany(chosenVersesData);
  },

  async update(
    id: string,
    chosenVerseData: ChosenVerseType,
  ): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findByIdAndUpdate(id, {
      $set: chosenVerseData,
    }, {new: true});
  },

  async delete(id: string): Promise<ChosenVerseType | null> {
    return await ChosenVerse.findByIdAndDelete(id);
  },
};
