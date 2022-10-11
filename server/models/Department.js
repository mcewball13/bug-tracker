const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model { }

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        company_id: {
            type: DataTypes.NUMBER,
            references: {
                model: 'company',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

module.exports = Department;