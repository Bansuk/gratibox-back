/* eslint-disable no-undef */
import '../src/Setup';
import supertest from 'supertest';
import createUser from '../Factories/UserFactory';
import app from '../src/App';
import connection from '../src/Database/Database';

describe('POST /SIGN-UP', () => {
  let user;

  beforeAll(async () => {
    user = await createUser();
    await connection.query('DELETE FROM session');
    await connection.query('DELETE FROM user_account');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM user_account');
    connection.end();
  });

  test('return 201 for valid input', async () => {
    await connection.query('DELETE FROM user_account');
    const result = await supertest(app).post('/sign-up').send(user);
    expect(result.status).toEqual(201);
  });

  test('return 400 for invalid input', async () => {
    const result = await supertest(app).post('/sign-up');
    expect(result.status).toEqual(400);
  });

  test('return 409 for email already in use', async () => {
    const result = await supertest(app).post('/sign-up').send(user);
    expect(result.status).toEqual(409);
  });
});
