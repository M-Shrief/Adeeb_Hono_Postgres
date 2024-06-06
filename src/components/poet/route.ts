import { Hono } from 'hono'
import { vValidator } from '@hono/valibot-validator'
import { flatten, object } from 'valibot'
// Component
import { PoetService } from './service'
import { ERROR_MSG, PoetType } from './interface'
import { createSchema, updateSchema } from './schema'
// Utils
import HttpStatusCode from '../../utils/httpStatusCode'
import { idSchema } from '../../utils/schemas'

export const poetRoute = new Hono()

poetRoute.get('/', async (c) => {
    const poets = await PoetService.getAll();
    if(!poets) return c.json(ERROR_MSG.NOT_AVAILABLE, HttpStatusCode.NOT_FOUND)
    return c.json(poets, HttpStatusCode.OK)
})

poetRoute.get(
    '/:id',
    vValidator('param', object({id: idSchema}), (result, c) => {
        if (!result.success) {
            return c.json({success: result.success, errors: flatten(result.issues).nested}, HttpStatusCode.NOT_ACCEPTABLE)
        }
    }),
    async (c) => {
        const poet = await PoetService.getOne(c.req.param('id'))
        return c.json(poet, HttpStatusCode.OK)
    }
)

poetRoute.post(
    '/', 
    vValidator('json', createSchema, (result, c) => {
        if (!result.success) {
            return c.json({success: result.success, errors: flatten(result.issues).nested}, HttpStatusCode.NOT_ACCEPTABLE)
        }
    }),
    async (c) => {
        const poetData = await c.req.json()
        const newPoet = await PoetService.post(poetData as PoetType) 
        if(!newPoet) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
        return c.json(newPoet, HttpStatusCode.CREATED)
    }
)

// poetRoute.post('/many', (c) => c.json('create many poets', HttpStatusCode.CREATED))

poetRoute.put(
    '/:id',
    vValidator('param', object({id: idSchema}), (result, c) => {
        if (!result.success) {
            return c.json({success: result.success, errors: flatten(result.issues).nested}, HttpStatusCode.NOT_ACCEPTABLE)
        }
    }),
    vValidator('json', updateSchema, (result, c) => {
        if (!result.success) {
            return c.json({success: result.success, errors: flatten(result.issues).nested}, HttpStatusCode.NOT_ACCEPTABLE)
        }
    }),
    async(c) => {
        const newData = await c.req.json()
        const newPoet = await PoetService.update(c.req.param('id'), newData)
        if(!newPoet) c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
        return c.json(newPoet, HttpStatusCode.ACCEPTED)
    }
)

poetRoute.delete(
    '/:id',
    vValidator('param', object({id: idSchema}), (result, c) => {
        if (!result.success) {
            return c.json({success: result.success, errors: flatten(result.issues).nested}, HttpStatusCode.NOT_ACCEPTABLE)
        }
    }),
    async(c) => {
        const deletedPoet = await PoetService.delete(c.req.param('id'))
        if(!deletedPoet) c.json(ERROR_MSG.NOT_FOUND, HttpStatusCode.NOT_ACCEPTABLE)
        return c.json(deletedPoet, HttpStatusCode.ACCEPTED)
    }
)



