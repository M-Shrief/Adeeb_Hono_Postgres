// Repository
import { PoetDB, PoetCache } from './repository';
// Types
import { Poet } from './entity';

export const PoetService = {
  async getAll(): Promise<Poet[] | false> {
    const poets = await PoetDB.getAll();
    if (poets.length === 0) return false;
    return poets;
  },

  async getOne(id: string): Promise<Poet | false> {
    let poet: Poet | null;
    const cached = await PoetCache.get(id);
    if (cached) {
      poet = JSON.parse(cached);
    } else {
      poet = await PoetDB.getOne(id);
    }
    if (!poet) return false;
    await PoetCache.set(id, poet);
    return poet;
  },

  async post(poetData: Poet): Promise<Poet | false> {
    const newPoet = await PoetDB.post(poetData);
    if (!newPoet) return false;
    return newPoet;
  },
  async postMany(poetsData: Poet[]): Promise<Poet[] | false> {
    const newPoets = await PoetDB.postMany(poetsData);
    if (newPoets.length == 0) return false;
    return newPoets;
  },

  async update(id: string, poetData: Poet): Promise<number | false> {
    const newPoet = await PoetDB.update(id, poetData);
    if (!newPoet.affected) return false;
    await PoetCache.delete(id);
    return newPoet.affected;
  },

  async delete(id: string): Promise<number | false> {
    const poet = await PoetDB.delete(id);
    if (!poet.affected) return false;
    await PoetCache.delete(id);
    return poet.affected;
  },
};
