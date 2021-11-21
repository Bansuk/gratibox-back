import jwt from 'jsonwebtoken';
import connection from '../src/Database/Database.js';

async function createSession(user) {
  const token = jwt.sign(
    { id: user.user_account_id, name: user.name, hasSubscription: user.has_subscription },
    process.env.JWT_SECRET,
    { expiresIn: 900 },
  );

  await connection.query(
    'INSERT INTO session (token, user_account_id) VALUES ($1, $2)',
    [token, user.user_account_id],
  );

  return {
    token,
  };
}

export default createSession;
