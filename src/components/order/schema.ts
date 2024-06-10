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
// other components
import { qouteSchema } from '../prose/schema';
// Utils
import { idSchema, nameSchema, versesSchema} from '../../utils/schemas';
import { phoneSchema } from '../partner/schema';

const customizationSchema = pipe(string(), minLength(1), maxLength(10));
const printSchema = object({
    id: optional(idSchema),
    poem: optional(idSchema),
    verses: optional(versesSchema),
    qoute: optional(qouteSchema)
})

const productsSchema = array(object({
    fontType: customizationSchema,
    fontColor: customizationSchema,
    backgroundColor: customizationSchema,
    print: optional(printSchema),
    prints: optional(array(printSchema))
}))

const addressSchema = pipe(string(), trim(), minLength(4), maxLength(50))

export const createSchema = object({
    partner: optional(idSchema),
    name: nameSchema,
    phone: phoneSchema,
    address: addressSchema,
    products: productsSchema,
    reviewed: boolean(),
    completed: boolean()
})

export const updateSchema = object({
    partner: optional(idSchema),
    name: optional(nameSchema),
    phone: optional(phoneSchema),
    address: optional(addressSchema),
    products: optional(productsSchema),
    reviewed: optional(boolean()),
    completed: optional(boolean())
})