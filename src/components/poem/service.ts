// Repository
import { PoemDB, PoemRedis } from './repository';
// Types
import { PoemType } from './interface';

export const PoemService = {
  async getAllWithPoet(): Promise<PoemType[] | false> {
    const poets = await PoemDB.getAllWithPoet();
    if (poets.length === 0) return false;
    return poets;
  },

  async getOneWithPoet(id: string): Promise<PoemType | false> {
    let poet: PoemType | null;
    const cached = await PoemRedis.get(id);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoemDB.getOneWithPoet(id);
    }
    if (!poet) return false;
    await PoemRedis.set(id, poet);
    return poet;
  },

  async post(poetData: PoemType): Promise<PoemType | false> {
    const newPoem = await PoemDB.post(poetData);
    if (!newPoem) return false;
    return newPoem;
  },
  async postMany(poetsData: PoemType[]): Promise<PoemType[] | false> {
    const newPoems = await PoemDB.postMany(poetsData);
    if (newPoems.length == 0) return false;
    return newPoems;
  },

  async update(id: string, poetData: PoemType): Promise<PoemType | false> {
    const newPoem = await PoemDB.update(id, poetData);
    if (!newPoem) return false;
    await PoemRedis.delete(id);
    return newPoem;
  },

  async delete(id: string): Promise<PoemType | false> {
    const poet = await PoemDB.delete(id);
    if (!poet) return false;
    await PoemRedis.delete(id);
    return poet;
  },
};
