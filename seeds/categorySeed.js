const { ProductCategories } = require('../server/models');
const { faker } = require('@faker-js/faker');

const _CATEGORIES = [];

for (let i = 0; i < 9; i++) {
  _CATEGORIES.push({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    isActive: true,
  });
}

const seedCategories = () => {
  try {
    return ProductCategories.bulkCreate(_CATEGORIES);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedCategories;
