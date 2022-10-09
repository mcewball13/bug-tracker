import { Ticket } from '../server/models/index.js';
import { faker } from '@faker-js/faker';

const _TICKETS = [];

for (let i = 0; i < 10; i++) {
  _TICKETS.push({
    title: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(3),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    status: faker.helpers.arrayElement(['open', 'in progress', 'closed']),
    dateCreated: faker.date.past(1),
    dateUpdated: faker.date.past(1),
    dateClosed: faker.date.past(1),
    employee_id: Math.floor(Math.random() * 8 + 1),
    bug_id: Math.floor(Math.random() * 30 + 1),
  });
}

const seedTickets = () => Ticket.bulkCreate(_TICKETS);

export default seedTickets;
