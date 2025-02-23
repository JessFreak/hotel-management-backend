import { unauthorizedError } from './responses/errors/unauthorizedError.js';
import { userResponse } from './responses/userResponse.js';
import { roomResponse } from './responses/roomResponse.js';
import { discountResponse } from './responses/discountResponse.js';
import { forbiddenError } from './responses/errors/forbiddenError.js';
import { notFoundError } from './responses/errors/notFoundError.js';

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Aura Hotel API',
      version: '1.0.0',
      description: 'API documentation for Aura Hotel',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: unauthorizedError,
        ForbiddenError: forbiddenError,
        NotFoundError: notFoundError,
        User: userResponse,
        Room: roomResponse,
        Discount: discountResponse,
      },
    },
  },
  apis: ['./src/routes/*.js'],
};
