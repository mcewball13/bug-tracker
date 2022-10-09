import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

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
