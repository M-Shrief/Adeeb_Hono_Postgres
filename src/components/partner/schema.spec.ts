import { describe, expect, test } from 'vitest';
import { safeParse } from 'valibot';
// component
import { signupSchema, loginSchema, updateSchema } from './schema';
import exp from 'constants';

describe.concurrent("Testing Poem's schema", async () => {
  let name = 'Name 1',
    phone = '01111111111',
    password = 'P@ssword1';
  let partner = { name, phone, password };
  describe('Testing Signup schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(signupSchema, partner);
      expect(res.success).toBe(true);
      expect(res.output).toEqual(partner);
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(signupSchema, { phone, password });
      expect(res1.success).toBe(false);
      const res2 = safeParse(signupSchema, { name, phone: 'dsa', password });
      expect(res2.success).toBe(false);
      const res3 = safeParse(signupSchema, { name, phone, password: 11 });
      expect(res3.success).toBe(false);
    });
  });
  describe('Testing login schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(loginSchema, { phone, password });
      expect(res.success).toBe(true);
      expect(res.output).toEqual({ phone, password });
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(loginSchema, { phone: 2121, password });
      expect(res1.success).toBe(false);
      const res2 = safeParse(loginSchema, { phone, password: 'dsa' });
      expect(res2.success).toBe(false);
    });
  });
  describe('Testing Update schema', async () => {
    test('Pass valid data successfully', async () => {
      const res = safeParse(updateSchema, { name, phone });
      expect(res.success).toBe(true);
      expect(res.output).toEqual({ name, phone });
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(updateSchema, { name: 'ss' });
      expect(res1.success).toBe(false);
      const res2 = safeParse(updateSchema, { phone: 'dsa', password });
      expect(res2.success).toBe(false);
      const res3 = safeParse(updateSchema, { name, phone, password: 11 });
      expect(res3.success).toBe(false);
    });
  });
});
