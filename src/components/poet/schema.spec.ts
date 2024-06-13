import { describe, expect, test } from 'vitest';
import { safeParse  } from 'valibot';
// component
import { createSchema, updateSchema } from './schema';

describe.concurrent("Testing Poet's schema", async() => {
    let name= "Name1", time_period= "جاهلي", bio= "Bio!, BIO BIO BIO", reviewed = true;
    let poet = {name, time_period, bio, reviewed};
    describe("Testing Create schema", async() => {
        test("Pass valid data successfully", async() => {
            const res = safeParse(createSchema, poet)
            expect(res.success).toEqual(true)
            expect(res.output).toEqual(poet)
        })
        test("InValid data, raise error with issues", async () => {
            const res1 = safeParse(createSchema, {name: 1, time_period, bio, reviewed})
            expect(res1.success).toEqual(false)
            const res2 = safeParse(createSchema, {name, time_period: "SA", bio, reviewed})
            expect(res2.success).toEqual(false)
            const res3 = safeParse(createSchema, {name, time_period, bio: 12, reviewed})
            expect(res3.success).toEqual(false)
        })
    })
    describe("Testing Update schema", async() => {
        test("Pass valid data successfully", async() => {
            const res = safeParse(updateSchema, {name})
            expect(res.success).toEqual(true)
            expect(res.output).toEqual({name})
        })
        test("InValid data, raise error with issues", async () => {
            const res1 = safeParse(updateSchema, {name: 1, bio})
            expect(res1.success).toEqual(false)
            const res2 = safeParse(updateSchema, {name, time_period: "SA", bio })
            expect(res2.success).toEqual(false)
            const res3 = safeParse(updateSchema, { bio: 12, reviewed})
            expect(res3.success).toEqual(false)
        })
    })
})
