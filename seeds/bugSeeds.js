import { Bug } from '../server/models/index.js';
import { faker } from '@faker-js/faker';

const _BUGS = [];

for (let i = 0; i < 100; i++) {
  _BUGS.push({
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(3),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    status: faker.helpers.arrayElement(['open', 'reviewing', 'assigned', 'closed']),
    dateCreated: faker.date.past(1),
    dateUpdated: faker.date.past(1),
    dateClosed: faker.date.past(1),
    employee_id: Math.floor(Math.random() * 8 + 1),
  });
}

const seedBugs = () => Bug.bulkCreate(_BUGS);

export default seedBugs;
