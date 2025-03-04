import request from 'supertest';

import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able JWT token for sessions of user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able JWT token for sessions of user without email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'daniel@test.com',
        password: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able JWT token for sessions of user without password', async () => {
    const user = await factory.attrs('User', {
      email: 'daniel@test.com',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able JWT token for sessions of user without fields', async () => {
    const response = await request(app)
      .post('/sessions')
      .send();

    expect(response.status).toBe(400);
  });

  it('should be able not permited created session with email invalid', async () => {
    const user = await factory.create('User', {
      email: 'daniel@test.com',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'daniel1@test.com',
        password: user.password,
      });

    expect(response.status).toBe(400);
  });

  it('should be able not permited created session with password invalid', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(400);
  });
});
