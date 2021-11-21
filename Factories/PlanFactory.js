import faker from 'faker/locale/pt_BR';
import connection from '../src/Database/Database';

export default async function createPlan() {
  const plan = {
    name: faker.commerce.productName(),
    image: faker.image.imageUrl(),
    image_alt: faker.lorem.words(),
    description: faker.commerce.productDescription(),
  };

  await connection.query(
    'INSERT INTO plan(name, image, image_alt, description) VALUES ($1, $2, $3, $4)',
    [plan.name, plan.image, plan.image_alt, plan.description],
  );
}
