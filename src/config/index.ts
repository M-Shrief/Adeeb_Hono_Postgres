import fs from 'fs';
// Utils
import { logger } from '../utils/logger';

export const { NODE_ENV, PORT, LOG_DIR, CACHE_URL, CORS_ORIGIN } = process.env;

/**
 * Database config
 */
export const DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ca: process.env.CA_CERTIFICATE,
};

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
