import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/configs/db.js';
import userRoutes from './src/routes/userRoutes.js';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from './src/middlewares/errorHandler.js';

await connectDB();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND, 'Resource Not Found'));
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
