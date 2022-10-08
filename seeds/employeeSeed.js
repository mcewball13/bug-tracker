const { Employees } = require('../server/models');

const _DEFAULT_EMPLOYEE = {
  username: 'demoAdmin',
  email: 'demo@minimals.cc',
  password: 'demo1234',
  firstName: 'Demo',
  lastName: 'Admin',
};

const seedEmployees = () => {
  try {
    return Employees.create(_DEFAULT_EMPLOYEE);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedEmployees;
