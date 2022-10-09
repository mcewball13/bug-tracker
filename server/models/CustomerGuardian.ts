import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';




class CustomerGuardian extends Model<InferAttributes<CustomerGuardian>, InferCreationAttributes<CustomerGuardian>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare displayName: string;
  declare email: string;
  declare password: string;
  declare resetPasswordToken: string;
  declare resetPasswordExpires: number;
  declare resetPasswordTokenUsed: boolean;

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
      beforeCreate: async ({password}, options) => {
        try {
          password = await bcrypt.hash(password, 10);
          return password;
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

CustomerGuardian.addHook('beforeCreate', async (customerGuardian) => {  
  customerGuardian.password = await bcrypt.hash(customerGuardian.password, 10);
  return customerGuardian;
});


export default CustomerGuardian;