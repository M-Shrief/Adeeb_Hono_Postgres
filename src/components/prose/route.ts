import { Hono } from 'hono';
import { array,} from 'valibot';
// Component
import { ProseService } from './service';
import { ERROR_MSG, ProseType } from './interface';
import { createSchema, updateSchema } from './schema';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';
import { idParamValidator, jsonValidator } from '../../utils/validators';

export const proseRoute = new Hono();

proseRoute.get('/', async (c) => {
  const proses = await ProseService.getAllWithPoet();
  if (!proses) return c.json(ERROR_MSG.NOT_AVAILABLE, HttpStatusCode.NOT_FOUND);
  return c.json(proses, HttpStatusCode.OK);
});

proseRoute.get('/random', async (c) => {
  const num = Number(c.req.query('num'))
  if(isNaN(num)) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
  const proses = await ProseService.getRandomWithPoet(num);
  if (!proses) return c.json(ERROR_MSG.NOT_AVAILABLE, HttpStatusCode.NOT_FOUND);
  return c.json(proses, HttpStatusCode.OK);
});

proseRoute.get('/:id', idParamValidator(), async (c) => {
  const prose = await ProseService.getOneWithPoet(c.req.param('id'));
  if(!prose) return c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_FOUND)
  return c.json(prose, HttpStatusCode.OK);
});

proseRoute.post('/', jsonValidator(createSchema), async (c) => {
  const proseData = await c.req.json();
  const newProse = await ProseService.post(proseData as ProseType);
  if (!newProse) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newProse, HttpStatusCode.CREATED);
});

proseRoute.post('/many', jsonValidator(array(createSchema)), async (c) => {
  const newData = await c.req.json();
  const newProses = await ProseService.postMany(newData);
  if (!newProses) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newProses, HttpStatusCode.CREATED);
});

proseRoute.put('/:id', idParamValidator(), jsonValidator(updateSchema), async (c) => {
  const newData = await c.req.json();
  const newProse = await ProseService.update(c.req.param('id'), newData);
  if (!newProse) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newProse, HttpStatusCode.ACCEPTED);
});

proseRoute.delete('/:id', idParamValidator(), async (c) => {
  const deletedProse = await ProseService.delete(c.req.param('id'));
  if (!deletedProse) c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(deletedProse, HttpStatusCode.ACCEPTED);
});
