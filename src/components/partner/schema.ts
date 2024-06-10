import {
    pipe,
    optional,
    picklist,
    object,
    string,
    trim,
    maxLength,
    minLength,
    boolean,
  } from 'valibot';
//   Utils
import { nameSchema } from '../../utils/schemas';

export const phoneSchema = pipe(string(), trim(), minLength(4), maxLength(50));
const passwordSchema = pipe(string(), trim(), minLength(4), maxLength(100));

export const signupSchema = object({
    name: nameSchema,
    phone: phoneSchema,
    password: passwordSchema,
})

export const loginSchema = object({
    phone: phoneSchema,
    password: passwordSchema,
})

export const updateSchema = object({
    name: optional(nameSchema),
    phone: optional(phoneSchema),
    password: optional(passwordSchema),
})