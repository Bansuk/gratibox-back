import bcrypt from 'bcrypt';
import connection from '../Database/Database.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const result = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email],
    );

    if (result.rowCount) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(
      'INSERT INTO users(name, email, password) VALUES ($1, $2, $3);',
      [name, email, passwordHash],
    );

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default signUp;
