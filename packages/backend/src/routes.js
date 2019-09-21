import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import ValidatorUserStore from './app/validators/UserStore';
import ValidatorUserUpdate from './app/validators/UserUpdate';
import ValidatorSessionStore from './app/validators/SessionStore';

const routes = Router();

routes.post('/users', ValidatorUserStore, UserController.store);
routes.post('/sessions', ValidatorSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', ValidatorUserUpdate, UserController.update);

export default routes;
