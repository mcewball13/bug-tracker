const { Employee } = require("../server/Employee");
const { faker } = require("@faker-js/faker");

const _EMPLOYEES = [];

for (let i = 0; i < 8; i++) {
    _EMPLOYEES.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        displayName: faker.name.findName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        company_id: Math.floor(Math.random() * 7 + 1),
        locations_id: Math.floor(Math.random() * 4 + 1),
    });
}

const seedGuardians = () => CustomerGuardian.bulkCreate(_EMPLOYEES);

module.exports = seedGuardians;
