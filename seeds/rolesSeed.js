const { EmployeeRoles } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _ROLES = [];

for (let i = 0; i < 4; i++) {
  _ROLES.push({
    roleTitle: faker.commerce.department(),
    description: faker.lorem.lines(1),
    thumbnail: faker.image.image(),
    isActive: faker.helpers.arrayElement([true, false]),
  });
}

const seedRoles = () => {
  try {
    return EmployeeRoles.bulkCreate(_ROLES);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedRoles;
