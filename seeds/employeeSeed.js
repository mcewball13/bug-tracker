import { Employee } from '../server/models/index.js';
import { faker } from '@faker-js/faker';

const _EMPLOYEES = [{
  firstName: "Mike",
  lastName: "Smith",
  displayName: "Mike Smith",
  email: "mcewball13@gmail.com",
  password: "password1234",
  company_id: 1,
}];

for (let i = 0; i < 8; i++) {
  _EMPLOYEES.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    displayName: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    company_id: Math.floor(Math.random() * 7 + 1),
  });
}

const seedEmployees = () => Employee.bulkCreate(_EMPLOYEES);

export default seedEmployees;
