import { Hono } from 'hono';
// Middleware
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { cors } from 'hono/cors';
import { compress } from 'hono/compress';
// import { HTTPException } from 'hono/http-exception'
// import { StatusCode } from 'hono/utils/http-status'

// Routes
import { poetRoute } from './components/poet/route';
import { poemRoute } from './components/poem/route';
import { proseRoute } from './components/prose/route';
import { chosenVerseRoute } from './components/chosenVerse/route';
import { partnerRoute } from './components/partner/route';
// Utils
import HttpStatusCode from './utils/httpStatusCode';

export const app = new Hono();

app.use(logger());
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
app.route('/api/partner', partnerRoute);

// ...

// app.get('/error', async (c, next) => {
//   const errorResponse = new Response('Unauthorized', {
//     status: HttpStatusCode.UNAUTHORIZED,
//     headers: {
//       Authenticate: 'error="invalid_token"',
//     },
//   })
//   throw new HTTPException(401, { res: errorResponse })
// })

// app.onError((err, c) => {
//   if (err instanceof HTTPException) {
//     const res = err.getResponse()
//     c.status(res.status as StatusCode)
//     return c.json(res)
//   } else {
//     c.status(400)
//     return c.text("Error, try again later")
//   }

// })
