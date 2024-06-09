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


export const signupSchema = object({
    name: pipe(string(), trim(), minLength(4), maxLength(50)),
    phone: pipe(string(), trim(), minLength(4), maxLength(50)),
    password: pipe(string(), trim(), minLength(4), maxLength(100)),
})

export const loginSchema = object({
    phone: pipe(string(), trim(), minLength(4), maxLength(50)),
    password: pipe(string(), trim(), minLength(4), maxLength(100)),
})

export const updateSchema = object({
    name: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    phone: optional(pipe(string(), trim(), minLength(4), maxLength(50))),
    password: optional(pipe(string(), trim(), minLength(4), maxLength(100))),
})