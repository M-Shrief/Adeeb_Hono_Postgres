import { app } from './app';
import { serve } from '@hono/node-server'

export const start = async () => {
    try {

        serve({
           fetch: app.fetch,
            port: 3000
        })

        console.info("App served at: localhost:3000")

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start()