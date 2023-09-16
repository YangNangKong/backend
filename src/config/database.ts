import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  (process.env.MYSQL_DATABASE || 'mydatabase'),
  (process.env.MYSQL_USER || 'root'),
  (process.env.MYSQL_PASSWORD || ''),
  {
    host: (process.env.MYSQL_NAME || 'localhost'),
    dialect: 'mysql',
  });

export default sequelize;