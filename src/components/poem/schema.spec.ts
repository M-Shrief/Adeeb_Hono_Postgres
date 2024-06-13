import { describe, expect, test } from 'vitest';
import { safeParse  } from 'valibot';
// component
import { createSchema, updateSchema } from './schema';

describe.concurrent("Testing Poem's schema", async() => {
    let intro= 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري', poet = "6371e9ce885e286801facca2", verses = [{ first: 'حُكــمُ المَنِيَّـةِ فـي البَرِيَّـةِ جـاري', sec: 'مــا هَــذِهِ الــدُنيا بِـدار قَـرار'}], reviewed = true;
    let poem = {intro,poet, verses, reviewed};
    describe("Testing Create schema", async() => {
        test("Pass valid data successfully", async() => {
            const res = safeParse(createSchema, poem)
            expect(res.success).toEqual(true)
            expect(res.output).toEqual(poem)
        })
        test("InValid data, raise error with issues", async () => {
            const res1 = safeParse(createSchema, {intro: 1,poet, verses, reviewed})
            expect(res1.success).toEqual(false)
            const res2 = safeParse(createSchema, {intro,poet:" 1", verses, reviewed})
            expect(res2.success).toEqual(false)
            const res3 = safeParse(createSchema, {intro,poet, verses: [{first:1, sec: "sdadsa"}], reviewed})
            expect(res3.success).toEqual(false)
        })
    })
    describe("Testing Update schema", async() => {
        test("Pass valid data successfully", async() => {
            const res = safeParse(updateSchema, {intro})
            expect(res.success).toEqual(true)
            expect(res.output).toEqual({intro})
        })
        test("InValid data, raise error with issues", async () => {
            const res1 = safeParse(updateSchema, {intro: 12})
            expect(res1.success).toEqual(false)
            const res2 = safeParse(updateSchema, {intro, verses: 1 })
            expect(res2.success).toEqual(false)
            const res3 = safeParse(updateSchema, { poet: "fsasaf"})
            expect(res3.success).toEqual(false)
        })
    })
})
