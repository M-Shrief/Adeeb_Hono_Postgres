import { Hono } from 'hono';
// Component
import { PartnerService } from './service';
import { signupSchema, loginSchema, updateSchema } from './schema';
import { ERROR_MSG, PERMISSIONS } from './interface';
// Utils
import { jsonValidator } from '../../utils/validators';
import HttpStatusCode from '../../utils/httpStatusCode';
import { signToken, isAuthenticated, isAuthorized } from '../../utils/auth';

export const partnerRoute = new Hono();

partnerRoute.get(
  '/me',
  isAuthenticated(),
  isAuthorized(PERMISSIONS.READ),
  async (c) => {
    const payload = c.get('jwtPayload');
    const partner = await PartnerService.getInfo(payload._id);
    if (!partner)
      return c.json({ message: ERROR_MSG.NOT_VALID }, HttpStatusCode.NOT_FOUND);
    return c.json(partner, HttpStatusCode.OK);
  },
);
partnerRoute.post('/signup', jsonValidator(signupSchema), async (c) => {
  const newData = await c.req.json();
  const newPartner = await PartnerService.signup(newData);
  if (!newPartner)
    return c.json(
      { message: ERROR_MSG.NOT_VALID },
      HttpStatusCode.NOT_ACCEPTABLE,
    );
  const token = await signToken({
    _id: newPartner._id,
    name: newPartner.name,
    permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE],
  });
  return c.json(
    { partner: newPartner, accessToken: token },
    HttpStatusCode.CREATED,
  );
});

partnerRoute.post('/login', jsonValidator(loginSchema), async (c) => {
  const loginData = await c.req.json();
  const partner = await PartnerService.login(
    loginData.phone,
    loginData.password,
  );
  if (!partner)
    return c.json(
      { message: ERROR_MSG.NOT_VALID },
      HttpStatusCode.NOT_ACCEPTABLE,
    );
  const token = await signToken({
    _id: partner._id,
    name: partner.name,
    permissions: [PERMISSIONS.READ, PERMISSIONS.WRITE],
  });
  return c.json({ partner, accessToken: token }, HttpStatusCode.ACCEPTED);
});

partnerRoute.put(
  '/me',
  isAuthenticated(),
  isAuthorized(PERMISSIONS.WRITE),
  jsonValidator(updateSchema),
  async (c) => {
    const payload = c.get('jwtPayload');
    const newData = await c.req.json();
    const partner = await PartnerService.update(payload._id, newData);
    if (!partner)
      return c.json(
        { message: ERROR_MSG.NOT_VALID },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    return c.json(partner, HttpStatusCode.ACCEPTED);
  },
);

partnerRoute.delete(
  '/me',
  isAuthenticated(),
  isAuthorized(PERMISSIONS.WRITE),
  async (c) => {
    const payload = c.get('jwtPayload');
    const partner = await PartnerService.delete(payload._id);
    if (!partner)
      return c.json(
        { message: ERROR_MSG.NOT_VALID },
        HttpStatusCode.NOT_ACCEPTABLE,
      );
    return c.json(partner, HttpStatusCode.ACCEPTED);
  },
);
