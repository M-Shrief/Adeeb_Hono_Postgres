import { Poet } from './model';
import { cacheClient } from '../../cache';
import { PoetType } from './interface';
import { Types } from 'mongoose';

export const PoetDB = {
  async getAll(): Promise<PoetType[]> {
    return await Poet.find({});
  },

  async getOne(id: string): Promise<PoetType | null> {
    const poet = await Poet.aggregate<PoetType>([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $unset: ['reviewed', 'createdAt', 'updatedAt'],
      },
      {
        $lookup: {
          from: 'poems',
          localField: '_id',
          foreignField: 'poet',
          as: 'poems',
          pipeline: [
            {
              $unset: ['poet', 'verses', 'reviewed', 'createdAt', 'updatedAt'],
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'proses',
          localField: '_id',
          foreignField: 'poet',
          as: 'proses',
          pipeline: [
            {
              $unset: ['poet', 'reviewed', 'createdAt', 'updatedAt'],
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'chosenverses',
          localField: '_id',
          foreignField: 'poet',
          as: 'chosenVerses',
          pipeline: [
            {
              $unset: ['poet', 'reviewed', 'createdAt', 'updatedAt'],
            },
          ],
        },
      },
    ]);
    if (poet.length == 0) return null;
    return poet[0];
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
