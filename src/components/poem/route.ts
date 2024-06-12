import { Hono } from 'hono';
import { array } from 'valibot';
// Component
import { PoemService } from './service';
import { ERROR_MSG, PoemType } from './interface';
import { createSchema, updateSchema } from './schema';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';
import { idParamValidator, jsonValidator } from '../../utils/validators';

export const poemRoute = new Hono();

poemRoute.get('/', async (c) => {
  const poems = await PoemService.getAllWithPoetName();
  if (!poems) return c.json(ERROR_MSG.NOT_AVAILABLE, HttpStatusCode.NOT_FOUND);
  return c.json(poems, HttpStatusCode.OK);
});

poemRoute.get('/:id', idParamValidator(), async (c) => {
  const poem = await PoemService.getOneWithPoet(c.req.param('id'));
  if(!poem) return c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_FOUND)
  return c.json(poem, HttpStatusCode.OK);
});

poemRoute.post('/', jsonValidator(createSchema), async (c) => {
  const poemData = await c.req.json();
  const newPoem = await PoemService.post(poemData as PoemType);
  if (!newPoem) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoem, HttpStatusCode.CREATED);
});

poemRoute.post('/many', jsonValidator(array(createSchema)), async (c) => {
  const newData = await c.req.json();
  const newPoems = await PoemService.postMany(newData);
  if (!newPoems) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoems, HttpStatusCode.CREATED);
});

poemRoute.put('/:id', idParamValidator(), jsonValidator(updateSchema), async (c) => {
  const newData = await c.req.json();
  const newPoem = await PoemService.update(c.req.param('id'), newData);
  if (!newPoem) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newPoem, HttpStatusCode.ACCEPTED);
});

poemRoute.delete('/:id', idParamValidator(), async (c) => {
  const deletedPoem = await PoemService.delete(c.req.param('id'));
  if (!deletedPoem) c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(deletedPoem, HttpStatusCode.ACCEPTED);
});
