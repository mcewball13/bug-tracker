import { Model, DataTypes, Optional, } from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';


interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: number;
  resetPasswordTokenUsed: boolean;
}

export interface UserInputType extends Optional<UserAttributes, 'id'> {}
export interface UserOutputType extends Required<UserAttributes> {}




class CustomerGuardian extends Model<UserAttributes, UserInputType> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public displayName!: string;
  public email!: string;
  public password!: string;
  public resetPasswordToken!: string;
  public resetPasswordExpires!: number;
  public resetPasswordTokenUsed!: boolean;

  checkPassword(loginPassword:string): Promise<boolean>{
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
      beforeCreate: async (newCustomer: UserInputType) => {
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