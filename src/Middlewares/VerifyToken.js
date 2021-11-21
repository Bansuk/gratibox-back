/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import connection from '../Database/Database.js';

async function verifyToken(req, res, next) {
  const authorization = req.headers['authorization'];
  const token = authorization.split('Bearer ')[1];

  if (!token) return res.sendStatus(401);

  const result = await connection.query(
    `
    SELECT * FROM session
    JOIN user_account
    ON session.user_account_id = user_account.user_account_id
    WHERE session.token = $1
  `,
    [token],
  );

  const user = result.rows[0];

  if (!user) return res.sendStatus(401);

  next();
}
export default verifyToken;
