import { Hono } from 'hono';
// Middleware
import { logger as loggerMiddleware } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { cors } from 'hono/cors';
import { compress } from 'hono/compress';
// Routes
import { poetRoute } from './components/poet/route';
import { poemRoute } from './components/poem/route';
import { proseRoute } from './components/prose/route';
import { chosenVerseRoute } from './components/chosenVerse/route';
// import { partnerRoute } from './components/partner/route';
// import { orderRoute } from './components/order/route';
// Utils
import HttpStatusCode from './utils/httpStatusCode';
import { logger } from './utils/logger';
import { AppError } from './utils/error';

export const app = new Hono();

app.use(loggerMiddleware());
app.use(secureHeaders());
app.use(cors());
app.use(compress());

app.get('/', (c) => {
  c.status(HttpStatusCode.OK);
  return c.json('Hello Hono!');
});

app.route('/api/poets', poetRoute);
app.route('/api/poems', poemRoute);
app.route('/api/proses', proseRoute);
app.route('/api/chosenverses', chosenVerseRoute);
// app.route('/api/partner', partnerRoute);
// app.route('/api/orders', orderRoute);

// Error Handling
app.onError((err, c) => {
  if (err instanceof AppError) {
    logger.error(err.message);
    return c.json({ message: err.message }, err.status);
  } else {
    return process.exit(1);
  }
});

process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('uncaughtException', async (error: Error) => {
  logger.error(error);
  process.exit(1);
});
