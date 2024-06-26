// Component
import { ProseDB } from './repository';
import { Prose } from './entity';

export const ProseService = {
  async getAllWithPoet(): Promise<Prose[] | false> {
    const proses = await ProseDB.getAllWithPoet();
    if (proses.length === 0) return false;
    return proses;
  },

  async getRandomWithPoet(num: number): Promise<Prose[] | false> {
    const proses = await ProseDB.getRandomWithPoet(num);
    if (proses.length === 0) return false;
    return proses;
  },

  async getOneWithPoet(id: string): Promise<Prose | false> {
    const prose = await ProseDB.getOneWithPoet(id);
    if (!prose) return false;
    return prose;
  },

  async post(proseData: Prose): Promise<Prose | false> {
    const newProse = await ProseDB.post(proseData);
    if (!newProse) return false;
    return newProse;
  },

  async postMany(prosesData: Prose[]): Promise<Prose[] | false> {
    const newProses = await ProseDB.postMany(prosesData);
    if (newProses.length == 0) return false;
    return newProses;
  },

  async update(id: string, proseData: Prose): Promise<number | false> {
    const newProse = await ProseDB.update(id, proseData);
    if (!newProse.affected) return false;
    return newProse.affected;
  },

  async delete(id: string): Promise<number | false> {
    const prose = await ProseDB.delete(id);
    if (!prose.affected) return false;
    return prose.affected;
  },
};
