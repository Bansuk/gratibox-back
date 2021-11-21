/* eslint-disable no-undef */
import '../src/Setup.js';
import supertest from 'supertest';
import app from '../src/App.js';
import connection from '../src/Database/Database.js';
import createPlan from '../Factories/PlanFactory.js';

beforeAll(async () => {
  await connection.query('DELETE FROM plan');
});

afterAll(async () => {
  await connection.query('DELETE FROM plan');
  connection.end();
});

describe('GET /PLANS', () => {
  test('return 404 for no available plans', async () => {
    const result = await supertest(app).get('/plans');
    expect(result.status).toEqual(404);
  });

  test('return 200 for plans', async () => {
    await createPlan();
    const result = await supertest(app).get('/plans');
    expect(result.status).toEqual(200);
  });
});
