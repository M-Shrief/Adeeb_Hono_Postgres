import { Hono } from 'hono';
import { array } from 'valibot';
// Component
import { PoetService } from './service';
import { ERROR_MSG, PoetType } from './interface';
import { createSchema, updateSchema } from './schema';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';
import { idValidator, jsonValidator } from '../../utils/validators';

export const poetRoute = new Hono();

poetRoute.get('/', async (c) => {
  const poets = await PoetService.getAll();
  if (!poets) return c.json(ERROR_MSG.NOT_AVAILABLE, HttpStatusCode.NOT_FOUND);
  return c.json(poets, HttpStatusCode.OK);
});

poetRoute.get('/:id', idValidator(), async (c) => {
  const poet = await PoetService.getOne(c.req.param('id'));
  return c.json(poet, HttpStatusCode.OK);
});

poetRoute.post('/', jsonValidator(createSchema), async (c) => {
  const poetData = await c.req.json();
  const newPoet = await PoetService.post(poetData as PoetType);
  if (!newPoet) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoet, HttpStatusCode.CREATED);
});

poetRoute.post('/many', jsonValidator(array(createSchema)), async (c) => {
  const newData = await c.req.json();
  const newPoets = await PoetService.postMany(newData);
  if (!newPoets) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoets, HttpStatusCode.CREATED);
});

poetRoute.put('/:id', idValidator(), jsonValidator(updateSchema), async (c) => {
  const newData = await c.req.json();
  const newPoet = await PoetService.update(c.req.param('id'), newData);
  if (!newPoet) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoet, HttpStatusCode.ACCEPTED);
});

poetRoute.delete('/:id', idValidator(), async (c) => {
  const deletedPoet = await PoetService.delete(c.req.param('id'));
  if (!deletedPoet) c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(deletedPoet, HttpStatusCode.ACCEPTED);
});
