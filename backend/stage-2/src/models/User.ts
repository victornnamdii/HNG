import { DataTypes, Model } from 'sequelize';
import { sq } from '../config/db';

class User extends Model {
  declare id: string;
  declare email: string;
  declare age: number;
  declare firstName: string;
  declare lastName: string;
  declare occupation: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, { sequelize: sq });

User.sync()
  .catch((error) => {
    console.log(error);
    throw error;
  });

export default User;
