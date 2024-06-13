import { describe, expect, test } from 'vitest';
import { safeParse } from 'valibot';
// component
import { createSchema, updateSchema } from './schema';

describe.concurrent("Testing Poem's schema", async () => {
  let poet = '6371ea7a885e286801facca8',
    poem = '6371ec50df3fa96d1a941c5d',
    reviewed = true,
    tags = 'الشجاعة,الحكمة',
    verses = [
      {
        first: 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ',
        sec: 'في حَدِّهِ الحَدُّ بَينَ الجِدِّ وَاللَعِبِ',
      },
      {
        first: 'بيضُ الصَفائِحِ لا سودُ الصَحائِفِ في',
        sec: 'مُتونِهِنَّ جَلاءُ الشَكِّ وَالرِيَبِ',
      },
    ];
  let chosenVerse = { poet, poem, tags, verses, reviewed };
  describe('Testing Create schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(createSchema, chosenVerse);
      expect(res.success).toBe(true);
      expect(res.output).toEqual(chosenVerse);
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(createSchema, {
        poet: 'sadsaffa',
        poem,
        tags,
        verses,
      });
      expect(res1.success).toBe(false);
      const res2 = safeParse(createSchema, {
        poet,
        poem: 'sadsaffa',
        tags,
        verses,
      });
      expect(res2.success).toBe(false);
      const res3 = safeParse(createSchema, { poet, poem, tags: 21, verses });
      expect(res3.success).toBe(false);
      const res4 = safeParse(createSchema, {
        poet,
        poem,
        tags: 21,
        verses: [{ first: 12, sec: 'second1' }],
      });
      expect(res4.success).toBe(false);
    });
  });
  describe('Testing Update schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(updateSchema, { poet });
      expect(res.success).toBe(true);
      expect(res.output).toEqual({ poet });
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(updateSchema, { poet: 'sadsaffa' });
      expect(res1.success).toBe(false);
      const res2 = safeParse(updateSchema, { poem: 'sadsaffa' });
      expect(res2.success).toBe(false);
      const res3 = safeParse(updateSchema, { tags: 21 });
      expect(res3.success).toBe(false);
      const res4 = safeParse(updateSchema, {
        verses: [{ first: 12, sec: 'second1' }],
      });
      expect(res4.success).toBe(false);
    });
  });
});
