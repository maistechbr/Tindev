import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';
// import api from '../../../src/services/api';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated e-mail', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able encrypt password with new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able encrypt password with new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123123', user.password_hash);

    expect(compareHash).toBe(false);
  });

  it('should not be able schema validate without fields', async () => {
    const response = await request(app)
      .post('/users')
      .send();

    expect(response.status).toBe(400);
  });
});
