import { Sequelize } from 'sequelize';

require('dotenv').config();

let sequelize: any;
process.env.JAWSDB_URL
  ? (sequelize = new Sequelize(process.env.JAWSDB_URL))
  : (sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }));
export default sequelize;
