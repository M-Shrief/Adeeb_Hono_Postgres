// Repository
import { PoemDB, PoemCache } from './repository';
// Types
import { Poem } from './entity';

export const PoemService = {
  async getAllWithPoet(): Promise<Poem[] | false> {
    const poems = await PoemDB.getAllWithPoet();
    if (poems.length === 0) return false;
    return poems;
  },

  async getOneWithPoet(id: string): Promise<Poem | false> {
    let poem: Poem | null;
    const cached = await PoemCache.get(id);
    if (cached) {
      poem = JSON.parse(cached);
    } else {
      poem = await PoemDB.getOneWithPoet(id);
    }
    if (!poem) return false;
    await PoemCache.set(id, poem);
    return poem;
  },

  async post(poetData: Poem): Promise<Poem | false> {
    const newPoem = await PoemDB.post(poetData);
    if (!newPoem) return false;
    return newPoem;
  },
  async postMany(poetsData: Poem[]): Promise<Poem[] | false> {
    const newPoems = await PoemDB.postMany(poetsData);
    if (newPoems.length == 0) return false;
    return newPoems;
  },

  async update(id: string, poetData: Poem): Promise<number | false> {
    const newPoem = await PoemDB.update(id, poetData);
    if (!newPoem.affected) return false;
    await PoemCache.delete(id);
    return newPoem.affected;
  },

  async delete(id: string): Promise<number | false> {
    const poem = await PoemDB.delete(id);
    if (!poem.affected) return false;
    await PoemCache.delete(id);
    return poem.affected;
  },
};
