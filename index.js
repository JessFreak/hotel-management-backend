import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/configs/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import roomRoutes from './src/routes/roomRoutes.js';
import discountRoutes from './src/routes/discountRoutes.js';
import reservationRoutes from './src/routes/reservationRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './src/configs/swagger.js';

import { ApolloServer } from 'apollo-server-express';
import typeDefs from './src/graphql/schema.js';
import resolvers from './src/graphql/resolvers.js';

await connectDB();

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/discounts', discountRoutes);
app.use('/reservations', reservationRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app });

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
});
