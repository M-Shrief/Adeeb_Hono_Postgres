import { Poet } from './model';
import { cacheClient } from '../../cache';
import { PoetType } from './interface';

export const PoetDB = {
  async getAll(): Promise<PoetType[]> {
    return await Poet.find({});
  },

  async getOne(id: string): Promise<PoetType | null> {
    const poet = await Poet.findById(id, { name: 1, bio: 1, time_period: 1 });
    if (!poet) return null;
    return poet;
  },

  async post(poetData: PoetType): Promise<PoetType> {
    const poet = new Poet({
      name: poetData.name,
      time_period: poetData.time_period,
      bio: poetData.bio,
      reviewed: poetData.reviewed,
    });
    return await poet.save();
  },

  async postMany(poetsData: PoetType[]): Promise<PoetType[]> {
    return await Poet.insertMany(poetsData);
  },

  async update(_id: string, poetData: PoetType): Promise<PoetType | null> {
    return await Poet.findByIdAndUpdate(_id, { $set: poetData }, { new: true });
  },

  async delete(id: string): Promise<PoetType | null> {
    return await Poet.findByIdAndDelete(id);
  },
};

export const PoetRedis = {
  async get(id: string): Promise<string | null> {
    return await cacheClient.get(`poet:${id}`);
  },
  async set(id: string, poet: PoetType): Promise<string | null> {
    return await cacheClient.set(
      `poet:${id}`,
      JSON.stringify(poet),
      'EX',
      60 * 15,
    );
  },
  async exists(id: string): Promise<number> {
    return await cacheClient.exists(`poet:${id}`);
  },
  async delete(id: string): Promise<number> {
    return await cacheClient.del(`poet:${id}`);
  },
};
