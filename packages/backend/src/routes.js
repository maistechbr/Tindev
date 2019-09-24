import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import ValidatorUserStore from './app/validators/UserStore';
import ValidatorUserUpdate from './app/validators/UserUpdate';
import ValidatorSessionStore from './app/validators/SessionStore';

const routes = Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', ValidatorUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  ValidatorSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', ValidatorUserUpdate, UserController.update);

export default routes;
