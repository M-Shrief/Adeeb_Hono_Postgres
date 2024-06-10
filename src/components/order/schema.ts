import {
    pipe,
    optional,
    object,
    string,
    trim,
    maxLength,
    minLength,
    boolean,
    array,
} from 'valibot';
// Utils
import { idSchema, versesSchema} from '../../utils/schemas';

const customizationSchema = pipe(string(), minLength(1), maxLength(10));
const printSchema = object({
    id: optional(idSchema),
    poem: optional(idSchema),
    verses: optional(versesSchema),
    qoute: optional(pipe(string(), trim(), minLength(4), maxLength(500)))
})

const productsSchema = array(object({
    fontType: customizationSchema,
    fontColor: customizationSchema,
    backgroundColor: customizationSchema,
    print: optional(printSchema),
    prints: optional(array(printSchema))
}))

export const createSchema = object({
    partner: optional(idSchema),
    name: pipe(string(), trim(), minLength(4), maxLength(50)),
    phone: pipe(string(), trim(), minLength(4), maxLength(50)),
    address: pipe(string(), trim(), minLength(4), maxLength(50)),
    products: productsSchema,
    reviewed: boolean(),
    completed: boolean()
})

export const updateSchema = object({
    partner: optional(idSchema),
    name: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    phone: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    address: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    products: optional(productsSchema),
    reviewed: optional(boolean()),
    completed: optional(boolean())
})