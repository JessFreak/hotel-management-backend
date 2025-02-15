import express from 'express';
import 'dotenv/config';
import { connectDB } from './src/configs/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import roomRoutes from './src/routes/roomRoutes.js';
import discountRoutes from './src/routes/discountRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

await connectDB();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes)
app.use('/rooms', roomRoutes);
app.use('/discounts', discountRoutes);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
