import bcrypt from 'bcrypt';
import faker from 'faker/locale/pt_BR';
import connection from '../src/Database/Database';

export default async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    passwordHash: bcrypt.hashSync('12345678', 10),
  };

  await connection.query(
    'INSERT INTO user_account(name, email, password) VALUES ($1, $2, $3)',
    [user.name, user.email, user.passwordHash],
  );

  return user;
}
