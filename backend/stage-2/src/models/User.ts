import { DataTypes, Model } from 'sequelize';
import { sq } from '../config/db';

class User extends Model {
  declare id: string;
  declare email: string | null;
  declare age: number | null;
  declare name: string;
  declare occupation: string | null;
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
    allowNull: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, { sequelize: sq });

User.sync({ alter: true })
  .catch((error) => {
    console.log(error);
    throw error;
  });

export default User;
