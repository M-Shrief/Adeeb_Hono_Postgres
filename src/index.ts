import { app } from './app';
import { serve } from '@hono/node-server';
// Utils
import { logger } from './utils/logger';

export const start = async () => {
    try {
        serve({
           fetch: app.fetch,
            port: 3000
        })

        logger.info('App Server at: localhost:3000')

    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

start()