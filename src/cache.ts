import Cache from 'iovalkey'
// config
import { CACHE_URL } from './config/index';
// Utils
import { logger } from './utils/logger'


// Connect automaticaly once it's used in the app.
export const cacheClient = CACHE_URL
? new Cache(CACHE_URL)
: new Cache();


cacheClient.on('connect', () => logger.info('Cache is connecting'));
cacheClient.on('ready', () => logger.info('Cache is ready'));
cacheClient.on('end', () => logger.info('Cache disconnected'));
cacheClient.on('reconnecting', (o: any) => logger.info(`Cache is reconnecting: ${o.attempt} attempts.`));
cacheClient.on('error', (err) => logger.error(`Cache error: ${err}`));


// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
    await cacheClient.disconnect();
    logger.info('Cache default connection disconnected through app termination');
});
