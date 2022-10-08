const { Memberships } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _MEMBERSHIPS = [];
const _MEMBERSHIP_NAMES = ['Summer Pass', 'Family', 'Single', false];

for (let i = 0; i < 4; i++) {
  _MEMBERSHIPS.push({
    title: faker.helpers.arrayElement(_MEMBERSHIP_NAMES),
    description: faker.lorem.lines(1),
    isActive: true,
  });
}

const seedMemberships = () => {
  try {
    return Memberships.bulkCreate(_MEMBERSHIPS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedMemberships;
