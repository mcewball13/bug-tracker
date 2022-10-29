import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




class Employee extends Model {

  checkPassword(loginPassword){
    return bcrypt.compare(loginPassword, this.password);
  }
  generateToken(){
    const payload = { userId: this.id};
    return jwt.sign({data: payload}, process.env.JWT_SECRET, {expiresIn: '1h'});
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 22],
      },
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      unique: true,
    },
    resetPasswordExpires: {
      type: DataTypes.BIGINT,
    },
    resetPasswordTokenUsed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async (newEmployee) => {
        try {
          console.log('beforeCreate hook');
          newEmployee.password = await bcrypt.hash(newEmployee.password, 10);
          return newEmployee;
        } catch (err) {
          throw new Error(err);
        }
      },
      beforeBulkCreate: async (employees) => {
        try {
          employees.forEach((employee) => {
            console.log(employee);
            employee.dataValues.password = bcrypt.hashSync(employee.password, 10);
          });
        } catch (err) {
          throw new Error(err);
        }
      },
      beforeUpdate: async (updatedCustomer) => {
        try {
          if (updatedCustomer.password) {
            updatedCustomer.password = await bcrypt.hash(updatedCustomer.password, 10);
          }
          return updatedCustomer;
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
    
  }
);


export default Employee;
