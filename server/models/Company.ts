const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

const currentDate = moment().format('MM/DD/YYYY');

class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressZip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    dateInBusiness: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'company',
  }
);

export default Company;
