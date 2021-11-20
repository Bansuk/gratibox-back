import connection from '../Database/Database.js';

async function getPlans(req, res) {
  try {
    const result = await connection.query('SELECT * FROM plan');

    if (!result.rowCount) return res.sendStatus(404);

    return res.send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export default getPlans;
