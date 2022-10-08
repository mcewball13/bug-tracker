import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';

class CustomerGuardian extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
  }
}

CustomerGuardian.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    guardianFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guardianLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
    addressStreet: {
      type: DataTypes.STRING,
    },
    addressCity: {
      type: DataTypes.STRING,
    },
    addressState: {
      type: DataTypes.STRING,
    },
    addressZipCode: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    photoURL: {
      type: DataTypes.STRING,
    },
    storedValue: {
      type: DataTypes.FLOAT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    isAccountOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
      beforeCreate: async (newCustomer) => {
        try {
          newCustomer.password = await bcrypt.hash(newCustomer.password, 10);
          return newCustomer;
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
    modelName: 'customer_guardian',
  }
);

export default CustomerGuardian;
