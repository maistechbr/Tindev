import request from 'supertest';

import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to update data with user authenticated', async () => {
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
        oldPassword: user.password,
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authentication', async () => {
    const response = await request(app)
      .put('/users')
      .send();

    expect(response.status).toBe(401);
  });

  it('should not be able to update with authentication, but without the token', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', 'Bearer')
      .send();

    expect(response.status).toBe(401);
  });

  it('should not be able pass email duplicated for update user', async () => {
    const user = await factory.attrs('User', {
      email: 'daniel@test.com',
    });

    await request(app)
      .post('/users')
      .send(user);

    const userTwo = await factory.attrs('User', {
      email: 'user2@test.com',
    });

    const {
      body: { email },
    } = await request(app)
      .post('/users')
      .send(userTwo);

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
        email,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able when update password from user is invalid', async () => {
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
        oldPassword: '123123',
        password: '1234567',
        confirmPassword: '1234567',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able validate without password', async () => {
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
        oldPassword: user.password,
        confirmPassword: '1234567',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able validate without confirmPassword', async () => {
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
        oldPassword: user.password,
        password: '1234567',
      });

    expect(response.status).toBe(400);
  });
});
