import { Hono } from 'hono';
import { array } from 'valibot';
// Component
import { ChosenVerseService } from './service';
import { ERROR_MSG, ChosenVerseType } from './interface';
import { createSchema, updateSchema } from './schema';
// Utils
import HttpStatusCode from '../../utils/httpStatusCode';
import { idParamValidator, jsonValidator } from '../../utils/validators';

export const chosenVerseRoute = new Hono();

chosenVerseRoute.get('/', async (c) => {
  const chosenVerses = await ChosenVerseService.getAllWithPoet();
  if (!chosenVerses)
    return c.json(
      { message: ERROR_MSG.NOT_AVAILABLE },
      HttpStatusCode.NOT_FOUND,
    );
  return c.json(chosenVerses, HttpStatusCode.OK);
});

chosenVerseRoute.get('/random', async (c) => {
  const num = Number(c.req.query('num'));
  if (isNaN(num))
    return c.json(
      { message: ERROR_MSG.NOT_VALID },
      HttpStatusCode.NOT_ACCEPTABLE,
    );
  const chosenVerses = await ChosenVerseService.getRandomWithPoet(num);
  if (!chosenVerses)
    return c.json(
      { message: ERROR_MSG.NOT_AVAILABLE },
      HttpStatusCode.NOT_FOUND,
    );
  return c.json(chosenVerses, HttpStatusCode.OK);
});

chosenVerseRoute.get('/:id', idParamValidator(), async (c) => {
  const chosenVerse = await ChosenVerseService.getOneWithPoet(
    c.req.param('id'),
  );
  if (!chosenVerse)
    return c.json({ message: ERROR_MSG.NOT_FOUND }, HttpStatusCode.NOT_FOUND);
  return c.json(chosenVerse, HttpStatusCode.OK);
});

chosenVerseRoute.post('/', jsonValidator(createSchema), async (c) => {
  const chosenVerseData = await c.req.json();
  const newChosenVerse = await ChosenVerseService.post(
    chosenVerseData as ChosenVerseType,
  );
  if (!newChosenVerse)
    c.json({ message: ERROR_MSG.NOT_VALID }, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(newChosenVerse, HttpStatusCode.CREATED);
});

chosenVerseRoute.post(
  '/many',
  jsonValidator(array(createSchema)),
  async (c) => {
    const newData = await c.req.json();
    const newChosenVerses = await ChosenVerseService.postMany(newData);
    if (!newChosenVerses)
      c.json({ message: ERROR_MSG.NOT_VALID }, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(newChosenVerses, HttpStatusCode.CREATED);
  },
);

chosenVerseRoute.put(
  '/:id',
  idParamValidator(),
  jsonValidator(updateSchema),
  async (c) => {
    const newData = await c.req.json();
    const newChosenVerse = await ChosenVerseService.update(
      c.req.param('id'),
      newData,
    );
    if (!newChosenVerse)
      c.json({ message: ERROR_MSG.NOT_VALID }, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(newChosenVerse, HttpStatusCode.ACCEPTED);
  },
);

chosenVerseRoute.delete('/:id', idParamValidator(), async (c) => {
  const deletedChosenVerse = await ChosenVerseService.delete(c.req.param('id'));
  if (!deletedChosenVerse)
    c.json({ message: ERROR_MSG.NOT_FOUND }, HttpStatusCode.NOT_ACCEPTABLE);
  return c.json(deletedChosenVerse, HttpStatusCode.ACCEPTED);
});
