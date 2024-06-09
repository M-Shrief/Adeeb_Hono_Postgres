import bcrypt from 'bcrypt';
import { JWT_PRIVATE, JWT_PUBLIC } from '../config';
import { sign, verify } from 'hono/jwt'

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(); // default 10
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (raw: string, hash: string) =>
  await bcrypt.compare(raw, hash);

export const signToken = async (user: any) => {
  return await sign(
    {
      ...user,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 Hours from now.
      iat: Math.floor(Date.now() / 1000), 
    },
    JWT_PRIVATE,
    "RS256"
  )
}

export const verifyToken = (token: string) => {
  return verify(
    token,
    JWT_PUBLIC,
    "RS256"
  )
}