import bcrypt from 'bcrypt';
import { jwt, sign } from 'hono/jwt';
import { createMiddleware } from 'hono/factory';
//
import { JWT_PRIVATE, JWT_PUBLIC } from '../config';
import HttpStatusCode from './httpStatusCode';

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
    'RS256',
  );
};

export const isAuthenticated = () => jwt({ secret: JWT_PUBLIC, alg: 'RS256' });

export const isAuthorized = (permission: string) =>
  createMiddleware(async (c, next) => {
    const permissions = c.get('jwtPayload').permissions as string[];
    if (!permissions || permissions.includes(permission) == false)
      return c.json('Not Authorized', HttpStatusCode.UNAUTHORIZED);
    await next();
  });
