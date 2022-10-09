import { Company } from '../server/models/index.js';
import { faker } from '@faker-js/faker';

const _COMPANIES = [];

for (let i = 0; i < 7; i++) {
  _COMPANIES.push({
    companyName: faker.company.name(),
    dateInBusiness: faker.date.past(50),
    addressStreet: faker.address.streetAddress(),
    addressCity: faker.address.cityName(),
    addressState: faker.address.stateAbbr(),
    addressZip: faker.address.zipCode(),
    addressPhone: faker.phone.number(),
  });
}

const seedCompanies = () => Company.bulkCreate(_COMPANIES);

export default seedCompanies;
