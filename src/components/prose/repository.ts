// Component
import { Prose } from './model';
import { ProseType } from './interface';

export const ProseDB = {
    async getAllWithPoet(): Promise<ProseType[]> {
      return await Prose.find(
        {},
        { poet: 1, tags: 1, qoute: 1, reviewed: 1 },
      ).populate('poet', 'name');
    },
  
    async getRandomWithPoet(num: number): Promise<ProseType[]> {
      return await Prose.aggregate([
        { $sample: { size: num } },
        {
          $unset: ['updatedAt', 'createdAt', 'tags', 'poet', 'reviewed', '__v'],
        },
      ]);
    },
  
    async getOneWithPoet(id: string): Promise<ProseType | null> {
      return await Prose.findById(id, {
        poet: 1,
        tags: 1,
        qoute: 1,
        reviewed: 1,
      }).populate('poet', 'name');
    },
  
    async post(proseData: ProseType): Promise<ProseType> {
      const prose = new Prose({
        poet: proseData.poet,
        tags: proseData.tags,
        qoute: proseData.qoute,
        reviewed: proseData.reviewed,
      });
  
      return await prose.save();
    },
  
    async postMany(
      prosesData: ProseType[],
    ): Promise< ProseType[]> {
      return await Prose.insertMany(prosesData);
    },
  
    async update(id: string, proseData: ProseType): Promise<ProseType | null> {
      return await Prose.findByIdAndUpdate(id, { $set: proseData }, {new: true});
    },
  
    async delete(id: string): Promise<ProseType | null> {
      return await Prose.findByIdAndDelete(id);
    },
  };
  