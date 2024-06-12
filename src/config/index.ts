import fs from 'fs';
// Utils
import { logger } from '../utils/logger';

export const { NODE_ENV, PORT, LOG_DIR, CACHE_URL, CORS_ORIGIN } = process.env;

const { DB_CONTAINER, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CONTAINER}:${DB_PORT}/${DB_NAME}`;

export let JWT_PRIVATE: string = '';
export let JWT_PUBLIC: string = '';

if (process.env.JWT_PRIVATE_FILE && process.env.JWT_PUBLIC_FILE) {
  JWT_PRIVATE = fs
    .readFileSync(process.env.JWT_PRIVATE_FILE!)
    .toString()
    .trim();
  JWT_PUBLIC = fs.readFileSync(process.env.JWT_PUBLIC_FILE!).toString().trim();
} else {
  logger.error('JWT Private key is not defined');
  logger.error('JWT Public key is not defined');
}
