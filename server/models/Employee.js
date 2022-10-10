const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    department_id: {
      type: DataTypes.NUMBER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
    
    tickets_id: {
      type: DataTypes.NUMBER,
      references: {
        model: 'tickets',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;
