const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Projects extends Model { }

Projects.init(
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
        github_url: {
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
        modelName: 'projects',
    }
);

module.exports = Projects;