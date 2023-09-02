import { createConnection, Connection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// mysql 관련 DB정보
const dbConfig = {
  host: process.env.MYSQL_NAME || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mydatabase',
};

let dbConnection: Connection;

async function connectToDatabase() {
  try {
    dbConnection = await createConnection(dbConfig);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

export { dbConnection, connectToDatabase };