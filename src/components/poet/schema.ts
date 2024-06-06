import { pipe, optional,picklist, object, string, trim, maxLength, minLength, boolean } from 'valibot'

const timePeriod = [
    'جاهلي',
    'أموي',
    'عباسي',
    'أندلسي',
    'عثماني ومملوكي',
    'متأخر وحديث',
    'القرن العشرين',
  ];

const TimePeriodSchema = picklist(timePeriod);

export const createSchema = object({
  name: pipe(string(), trim(), minLength(4),maxLength(50)),
  time_period: TimePeriodSchema,
  bio:  pipe(string(), trim(), minLength(4),maxLength(500)),
  reviewed: boolean(),
})

export const updateSchema = object({
  name: optional(pipe(string(), trim(), minLength(4),maxLength(50))),
  time_period: optional(TimePeriodSchema),
  bio:  optional(pipe(string(), trim(), minLength(4),maxLength(500))),
  reviewed: optional(boolean()),
})
