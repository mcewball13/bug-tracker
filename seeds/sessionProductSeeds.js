const { SessionProducts } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _SESSION_PRODUCTS = [];

for (let i = 0; i < 50; i++) {
  _SESSION_PRODUCTS.push({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    notes: faker.lorem.lines(3),
    isConsumable: faker.datatype.boolean(),
    autoConsumable: faker.datatype.boolean(),
    startDate: faker.date.past(1),
    endDate: faker.date.future(10),
    termsAndConditions: faker.lorem.lines(6),
    isActive: true,
  });
}

const seedSessionProducts = () => {
  try {
    return SessionProducts.bulkCreate(_SESSION_PRODUCTS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedSessionProducts;
