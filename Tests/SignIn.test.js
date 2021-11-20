/* eslint-disable no-undef */
import '../src/Setup.js';
import supertest from 'supertest';
import createUser from '../Factories/UserFactory.js';
import app from '../src/App.js';
import connection from '../src/Database/Database.js';

let user;

beforeAll(async () => {
  user = await createUser();
});

afterAll(async () => {
  connection.end();
});

describe('POST /SIGN-IN', () => {
  afterEach(async () => {
    await connection.query('DELETE FROM session');
    await connection.query('DELETE FROM user_account;');
  });

  test('return 200 for successful login', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: user.email, password: user.password });
    expect(result.status).toEqual(200);
  });

  test('return 401 for unauthorized user', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: user.email, password: user.password });
    expect(result.status).toEqual(401);
  });

  test('return 400 for invalid input', async () => {
    const result = await supertest(app).post('/sign-in');
    expect(result.status).toEqual(400);
  });
});
