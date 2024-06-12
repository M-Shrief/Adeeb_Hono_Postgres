// Component
import { ProseDB } from './repository';
import { ProseType } from './interface';

export const ProseService = {
  async getAllWithPoet(): Promise<ProseType[] | false> {
    const proses = await ProseDB.getAllWithPoet();
    if (proses.length === 0) return false;
    return proses;
  },

  async getRandomWithPoet(num: number): Promise<ProseType[] | false> {
    const proses = await ProseDB.getRandomWithPoet(num);
    if (proses.length === 0) return false;
    return proses;
  },

  async getOneWithPoet(id: string): Promise<ProseType | false> {
    const prose = await ProseDB.getOneWithPoet(id);
    if (!prose) return false;
    return prose;
  },

  async post(proseData: ProseType): Promise<ProseType | false> {
    const newProse = await ProseDB.post(proseData);
    if (!newProse) return false;
    return newProse;
  },

  async postMany(prosesData: ProseType[]): Promise<ProseType[] | false> {
    const newProses = await ProseDB.postMany(prosesData);
    if (newProses.length == 0) return false;
    return newProses;
  },

  async update(id: string, proseData: ProseType): Promise<ProseType | false> {
    const newProse = await ProseDB.update(id, proseData);
    if (!newProse) return false;
    return newProse;
  },

  async delete(id: string) {
    const prose = await ProseDB.delete(id);
    if (!prose) return false;
    return prose;
  },
};
