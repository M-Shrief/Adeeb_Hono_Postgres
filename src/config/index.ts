export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  CACHE_URL,
  CORS_ORIGIN
} = process.env;

const {
  DB_CONTAINER,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env

export const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CONTAINER}:${DB_PORT}/${DB_NAME}`
