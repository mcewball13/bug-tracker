import { Sequelize } from 'sequelize';

import * as dotenv from 'dotenv';
dotenv.config();

let sequelize;
process.env.JAWSDB_URL
  ? (sequelize = new Sequelize(process.env.JAWSDB_URL))
  : (sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }));
export default sequelize;
