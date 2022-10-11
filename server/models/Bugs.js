const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bugs extends Model { }

Bugs.init(
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
        projects_id: {
            type: DataTypes.NUMBER,
            references: {
                model: 'projects',
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
        employee_id: {
            type: DataTypes.NUMBER,
            references: {
                model: 'employee',
                key: 'id',
            },
        },
        tags: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Bugs',
    }
);

module.exports = Bugs;