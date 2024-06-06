import { Hono } from 'hono'
// Component
import { PoetService } from './service'
import { PoetType } from './interface'
// Utils
import HttpStatusCode from '../../utils/httpStatusCode'

export const poetRoute = new Hono()

poetRoute.get('/', async (c) => {
    const poets = await PoetService.getAll();
    return c.json(poets, HttpStatusCode.OK)
})

poetRoute.get('/:id', async (c) => {
    const poet = await PoetService.getOne(c.req.param('id'))
    return c.json(poet, HttpStatusCode.OK)
})

poetRoute.post('/', async (c) => {
    const poetData = await c.req.json()
    const newPoet = await PoetService.post(poetData as PoetType) 
    return c.json(newPoet, HttpStatusCode.CREATED)
})

// poetRoute.post('/many', (c) => c.json('create many poets', HttpStatusCode.CREATED))

poetRoute.put('/:id', async(c) => {
    const newData = await c.req.json()
    const newPoet = await PoetService.update(c.req.param('id'), newData)
    return c.json(newPoet, HttpStatusCode.ACCEPTED)}
)

poetRoute.delete('/:id', async(c) => {
    const deletedPoet = await PoetService.delete(c.req.param('id'))
    return c.json(deletedPoet, HttpStatusCode.ACCEPTED)}
)



