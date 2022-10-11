const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tickets extends Model { }

Tickets.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        mini_description: {
            type: DataTypes.STRING,
        },
        severity: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.STRING,
        },
        employee_id: {
            type: DataTypes.NUMBER,
            references: {
                model: 'employee',
                key: 'id',
            },
        },
        bugs_id: {
            type: DataTypes.NUMBER,
            references: {
                model: 'bugs',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Tickets',
    }
);

module.exports = Tickets;