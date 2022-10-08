const { CustomerMinor } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _MINORS = [];

for (let i = 0; i < 2000; i++) {
  _MINORS.push({
    minorFirstName: faker.name.firstName(),
    minorLastName: faker.name.lastName(),
    minorBirthday: faker.date.past(12, new Date()),
    email: faker.internet.email(),
    notes: faker.lorem.paragraph(3),
    company_id: Math.floor(Math.random() * 7 + 1),
    locations_id: Math.floor(Math.random() * 4 + 1),
  });
}

const seedMinors = () => CustomerMinor.bulkCreate(_MINORS);

module.exports = seedMinors;
