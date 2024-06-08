// Repository
import { PoetDB, PoetRedis } from './repository';
// Types
import { PoetType } from './interface';

export const PoetService = {
  async getAll(): Promise<PoetType[] | false> {
    const poets = await PoetDB.getAll();
    if (poets.length === 0) return false;
    return poets;
  },

  async getOne(id: string): Promise<PoetType | false> {
    let poet: PoetType | null;
    const cached = await PoetRedis.get(id);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoetDB.getOne(id);
    }
    if (!poet) return false;
    await PoetRedis.set(id, poet);
    return poet;
  },

  async post(poetData: PoetType): Promise<PoetType | false> {
    const newPoet = await PoetDB.post(poetData);
    if (!newPoet) return false;
    return newPoet;
  },
  async postMany(poetsData: PoetType[]): Promise<PoetType[] | false> {
    const newPoets = await PoetDB.postMany(poetsData);
    if (newPoets.length == 0) return false;
    return newPoets;
  },

  async update(id: string, poetData: PoetType): Promise<PoetType | false> {
    const newPoet = await PoetDB.update(id, poetData);
    if (!newPoet) return false;
    await PoetRedis.delete(id);
    return newPoet;
  },

  async delete(id: string): Promise<PoetType | false> {
    const poet = await PoetDB.delete(id);
    if (!poet) return false;
    await PoetRedis.delete(id);
    return poet;
  },
};
