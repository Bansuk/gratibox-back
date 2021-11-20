import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../Database/Database.js';
import { signInSchema } from '../../Validation/Schemes.js';

async function SignIn(req, res) {
  const { email, password } = req.body;

  if (signInSchema.validate({ email, password }).error) {
    return res.sendStatus(400);
  }

  try {
    const result = await connection.query(
      'SELECT * FROM user_account WHERE email = $1;',
      [email],
    );

    const user = result.rows[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.user_account_id, name: user.name, hasPlan: user.has_plan },
        process.env.JWT_SECRET,
        { expiresIn: 900 },
      );

      await connection.query(
        'INSERT INTO session (token, user_account_id) VALUES ($1, $2);',
        [token, user.user_account_id],
      );

      return res.send({ token });
    }
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default SignIn;
