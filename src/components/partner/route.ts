import { Hono } from 'hono';
import { jwt, type JwtVariables } from 'hono/jwt';
// Component
import {PartnerService} from './service'
import { signupSchema, loginSchema, updateSchema} from './schema'
import { ERROR_MSG } from './interface';
// Utils
import { jsonValidator } from '../../utils/validators';
import HttpStatusCode from '../../utils/httpStatusCode';
import { signToken } from '../../utils/auth';
import { JWT_PUBLIC } from '../../config';

export const partnerRoute = new Hono()

partnerRoute.get('/me', jwt({secret: JWT_PUBLIC, alg: "RS256"}), async (c) => {
    const payload = c.get('jwtPayload');
    const partner = await PartnerService.getInfo(payload._id);
    if(!partner) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_FOUND) 
    return c.json(partner, HttpStatusCode.OK)
})

partnerRoute.post('/signup', jsonValidator(signupSchema), async (c) => {
    const newData = await c.req.json()
    const newPartner = await PartnerService.signup(newData);
    if(!newPartner) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
    const token = await signToken({_id: newPartner._id, name: newPartner.name})
    return c.json({partner: newPartner, accessToken: token}, HttpStatusCode.CREATED)
})

partnerRoute.post('/login', jsonValidator(loginSchema), async (c) => {
    const loginData = await c.req.json()
    const partner = await PartnerService.login(loginData.phone, loginData.password);
    if(!partner) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
    const token = await signToken({_id: partner._id, name: partner.name})
    return c.json({partner, accessToken: token}, HttpStatusCode.ACCEPTED)
})

partnerRoute.put('/me', jwt({secret: JWT_PUBLIC, alg: "RS256"}), jsonValidator(updateSchema), async (c) => {
    const payload = c.get('jwtPayload');
    const newData = await c.req.json()
    const partner = await PartnerService.update(payload._id, newData);
    if(!partner) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
    return c.json(partner, HttpStatusCode.ACCEPTED)
})

partnerRoute.delete('/me', jwt({secret: JWT_PUBLIC, alg: "RS256"}), async (c) => {
    const payload = c.get('jwtPayload');
    const partner = await PartnerService.delete(payload._id);
    if(!partner) return c.json(ERROR_MSG.NOT_VALID, HttpStatusCode.NOT_ACCEPTABLE)
    return c.json(partner, HttpStatusCode.ACCEPTED)
})
