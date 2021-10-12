import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

it('get route', async () => {
  const response = await request.get('/');
  expect(200);
  expect(response.body.status).toBe('success');
  expect(response.body.message).toBe('Welcome to Our Food Management API.');
  expect(response.body.description).toBe('Stutern 1.0 Inter-track Group 5 Project (Backend).');
});
