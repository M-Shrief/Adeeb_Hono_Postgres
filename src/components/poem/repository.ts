import { Poem } from './model';
import { cacheClient } from '../../cache';
import { PoemType } from './interface';
import { set } from 'mongoose';
import { Poet } from '../poet/model';
import { PoetService } from '../poet/service';

export const PoemDB = {
  async getAllWithPoetName(): Promise<PoemType[]> {
    return await Poem.find({}, { intro: 1, poet: 1, reviewed: 1 }).populate(
      'poet',
      'name',
    );
  },

  async getOneWithPoet(id: string): Promise<PoemType | null> {
    return await Poem.findById(id, {
      intro: 1,
      poet: 1,
      verses: 1,
      reviewed: 1,
    }).populate('poet', ['name', 'bio', 'time_period']);
  },

  async post(poemData: PoemType): Promise<PoemType> {
    const poem = new Poem({
      intro: poemData.intro,
      poet: poemData.poet,
      verses: poemData.verses,
      reviewed: poemData.reviewed,
    });
    const newPoem = await poem.save();
    return newPoem;
  },

  async postMany(poemsData: PoemType[]): Promise<PoemType[]> {
    return await Poem.insertMany(poemsData);
  },

  async update(id: string, poemData: PoemType): Promise<PoemType | null> {
    return await Poem.findByIdAndUpdate(id, { $set: poemData }, { new: true });
  },

  async delete(id: string): Promise<PoemType | null> {
    return await Poem.findByIdAndDelete(id);
  },
};

export const PoemRedis = {
  async get(id: string): Promise<string | null> {
    return await cacheClient.get(`poem:${id}`);
  },
  async set(id: string, poem: PoemType): Promise<string | null> {
    return await cacheClient.set(
      `poem:${id}`,
      JSON.stringify(poem),
      'EX',
      60 * 15,
    );
  },
  async exists(id: string): Promise<number> {
    return await cacheClient.exists(`poem:${id}`);
  },
  async delete(id: string): Promise<number> {
    return await cacheClient.del(`poem:${id}`);
  },
};
