import express, { Request, Response } from 'express';
import { dbConnection, connectToDatabase } from './config/database';

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.get('/', async (req: Request, res: Response) => {
//   try {
//     if (!dbConnection) {
//       await connectToDatabase();
//     }
//     const [rows] = await dbConnection.query('select * from test_table');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).json({ error: 'Error executing query' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });