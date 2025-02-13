import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/configs/db.js';

await connectDB();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});