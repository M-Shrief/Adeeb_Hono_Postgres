import { Hono } from 'hono';
// Component
import { OrderService } from './service';
import { ERROR_MSG } from './interface';
import { createSchema, updateSchema } from './schema';
//
import { PERMISSIONS } from '../partner/interface';
// Utils
import { idParamValidator, jsonValidator } from '../../utils/validators';
import HttpStatusCode from '../../utils/httpStatusCode';
import { isAuthenticated, isAuthorized } from '../../utils/auth';

export const orderRoute = new Hono();


orderRoute.get('/guest', async (c) => {
    const {name, phone} = c.req.query()
    const guestOrders = await OrderService.getGuestOrders(name, phone)
    if(!guestOrders) return c.json({message: ERROR_MSG.NOT_FOUND}, HttpStatusCode.NOT_FOUND)
    return c.json(guestOrders, HttpStatusCode.OK)
})

orderRoute.get('/partner', isAuthenticated(), isAuthorized(PERMISSIONS.READ), async (c) => {
    const payload = c.get('jwtPayload');
    const partnerOrders = await OrderService.getPartnerOrders(payload._id)
    if(!partnerOrders) return c.json({message: ERROR_MSG.NOT_FOUND}, HttpStatusCode.NOT_FOUND)
    return c.json(partnerOrders, HttpStatusCode.OK)
})

orderRoute.post('/guest', jsonValidator(createSchema), async (c) => {
    const newData = await c.req.json();
    const newOrder = await OrderService.post(newData);
    if(!newOrder) return c.json({message: ERROR_MSG.NOT_VALID}, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(newOrder, HttpStatusCode.CREATED);
})

orderRoute.post('/partner', isAuthenticated(), isAuthorized(PERMISSIONS.WRITE), jsonValidator(createSchema), async (c) => {
    const partner = c.get('jwtPayload')._id;
    const newData = await c.req.json();
    const newOrder = await OrderService.post({...newData, partner});
    if(!newOrder) return c.json({message: ERROR_MSG.NOT_VALID}, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(newOrder, HttpStatusCode.CREATED);
})

orderRoute.put('/:id', idParamValidator(), isAuthenticated(), isAuthorized(PERMISSIONS.WRITE), jsonValidator(updateSchema), async (c) => {
    const newData = await c.req.json();
    const updatedOrder = await OrderService.update(c.req.param('id'), newData);
    if(!updatedOrder) return c.json({message: ERROR_MSG.NOT_VALID}, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(updatedOrder, HttpStatusCode.ACCEPTED);
})

orderRoute.delete('/:id', idParamValidator(), isAuthenticated(), isAuthorized(PERMISSIONS.WRITE), async (c) => {
    const deletedOrder = await OrderService.delete(c.req.param('id'));
    if(!deletedOrder) return c.json({message: ERROR_MSG.NOT_FOUND}, HttpStatusCode.NOT_ACCEPTABLE);
    return c.json(deletedOrder, HttpStatusCode.ACCEPTED);
})
