import { describe, expect, test } from 'vitest';
import { safeParse } from 'valibot';
// component
import { createSchema, updateSchema } from './schema';

describe.concurrent("Testing Poem's schema", async () => {
  let poet = '639b5f4db5e253099333b120',
    tags = 'tag1,tag2',
    qoute = 'Qoute, ...etc',
    reviewed = true;
  let prose = { poet, tags, qoute, reviewed };
  describe('Testing Create schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(createSchema, prose);
      expect(res.success).toBe(true);
      expect(res.output).toEqual(prose);
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(createSchema, { poet: 'AS', tags, qoute });
      expect(res1.success).toBe(false);
      const res2 = safeParse(createSchema, { poet, tags: 12, qoute });
      expect(res2.success).toBe(false);
      const res3 = safeParse(createSchema, { poet, tags, qoute: 12 });
      expect(res3.success).toBe(false);
    });
  });
  describe('Testing Update schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(updateSchema, { poet });
      expect(res.success).toBe(true);
      expect(res.output).toEqual({ poet });
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(updateSchema, { poet: 'SA' });
      expect(res1.success).toBe(false);
      const res2 = safeParse(updateSchema, { tags: 214 });
      expect(res2.success).toBe(false);
      const res3 = safeParse(updateSchema, { qoute: 'SA' });
      expect(res3.success).toBe(false);
    });
  });
});
