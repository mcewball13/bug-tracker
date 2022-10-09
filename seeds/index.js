import seedEmployees from './employeeSeed.js';
import seedCompanies from './companySeed.js';
import seedBugs from './bugSeeds.js';
import seedTickets from './ticketSeeds.js';
import sequelize from '../server/config/connection.js';

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('=============');
  await seedCompanies();
  console.log('=============');
  await seedEmployees();
  console.log('=============');
  await seedBugs();
  console.log('=============');
  await seedTickets();
  console.log('=============');

  process.exit(0);
};

seedAll();
