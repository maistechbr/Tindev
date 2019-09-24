import request from 'supertest';
import redis from 'redis';
import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';

describe('User update', () => {
  beforeEach(async () => {
    await truncate();
    redis
      .createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
      .subscribe('clean_cache');
  });

  it('should be able to update', async () => {
    const user = await factory.attrs('User', {
      email: 'daniel@gmail.com',
      password: '123456',
    });

    await request(app)
      .post('/users')
      .send(user);

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: '123456',
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able with verify of duplicated email', async () => {
    const user = await factory.create('User', {
      email: 'daniel@test.com',
      password: '123456',
    });

    const userTwo = await factory.create('User', {
      email: 'daniel2@test.com',
      password: '123456',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: userTwo.email,
        oldPassword: user.password,
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able with oldPassword error', async () => {
    const user = await factory.create('User', {
      email: 'daniel@test.com',
      password: '123456',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: '1234567',
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able validate without fields', async () => {
    const user = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: '',
        password: '',
        confirmPassword: '',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able permited invalid token JWT', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer`)
      .send();

    expect(response.status).toBe(400);
  });

  it('should not be able permited without token JWT', async () => {
    const response = await request(app)
      .put('/users')
      .send();

    expect(response.status).toBe(400);
  });
});
