import { describe, expect, test } from 'vitest';
import { safeParse } from 'valibot';
// component
import { createSchema, updateSchema } from './schema';

describe.concurrent("Testing Poem's schema", async () => {
  let products = [
      {
        prints: [
          {
            verses: [
              {
                first: 'تَرانا بارِزينَ وَكُلُّ حَيٍّ',
                sec: 'قَدِ اِتَّخَذوا مَخافَتَنا قَرينا',
              },
            ],
          },
          {
            verses: [
              {
                first: 'وَأُخَفِّضُ الزَفرات وَهيَ صَواعِدٌ',
                sec: 'وَأُكَفكِفُ العَبرات وَهيَ جَواري',
              },
              {
                first: 'وَشِهابُ زَندِ الحُزنِ إِن طاوَعتُهُ',
                sec: 'وَآرٍ وَإِن عاصَيتَهُ مُتَواري',
              },
            ],
          },
        ],
        fontType: 'نسخ',
        fontColor: '#fff',
        backgroundColor: '#000',
      },
      {
        prints: [
          {
            qoute:
              'واعلم أن السفهاء في الدنيا كثير، فمن كان يغضب لكلّ سفاهةٍ من سفيه فإنّ شقاءه سيطول بغضبه.',
          },
          {
            qoute:
              'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
          },
        ],
        fontType: 'نسخ',
        fontColor: '#000',
        backgroundColor: 'silver',
      },
    ],
    name = 'The Den Man',
    phone = '01235554567',
    address = '10Removed Adress',
    partner = '64ff0fb2e4cdbcc06848e89a';
  let guestOrder = {
    products,
    name,
    phone,
    address,
    reviewed: true,
    completed: false,
  };
  let partnerOrder = { partner, ...guestOrder };
  describe('Testing Create schema', async () => {
    test('Pass valid data successfully', async () => {
      const res1 = safeParse(createSchema, guestOrder);
      expect(res1.success).toBe(true);
      expect(res1.output).toEqual(guestOrder);

      const res2 = safeParse(createSchema, partnerOrder);
      expect(res2.success).toBe(true);
      expect(res2.output).toEqual(partnerOrder);
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(createSchema, {
        products: 12,
        name,
        phone,
        address,
      });
      expect(res1.success).toBe(false);
      const res2 = safeParse(createSchema, {
        products,
        name: 21,
        phone,
        address,
      });
      expect(res2.success).toBe(false);
      const res3 = safeParse(createSchema, {
        products,
        name,
        phone: 124,
        address,
      });
      expect(res3.success).toBe(false);
      const res4 = safeParse(createSchema, {
        products,
        name,
        phone,
        address: 12,
      });
      expect(res4.success).toBe(false);
      const res5 = safeParse(createSchema, {
        products,
        name,
        phone,
        address: 12,
        partner: 'asf',
      });
      expect(res5.success).toBe(false);
    });
  });
  describe('Testing Update schema', async () => {
    test('Pass valid data successfully', async () => {
      const res1 = safeParse(updateSchema, { products });
      expect(res1.success).toBe(true);
      expect(res1.output).toEqual({ products });
    });
    test('InValid data, raise error with issues', async () => {
      const res1 = safeParse(updateSchema, { products: 12 });
      expect(res1.success).toBe(false);
      const res2 = safeParse(updateSchema, { name: 21 });
      expect(res2.success).toBe(false);
      const res3 = safeParse(updateSchema, { phone: 124 });
      expect(res3.success).toBe(false);
      const res4 = safeParse(updateSchema, { address: 12 });
      expect(res4.success).toBe(false);
      const res5 = safeParse(updateSchema, { partner: 'asf' });
      expect(res5.success).toBe(false);
    });
  });
});
