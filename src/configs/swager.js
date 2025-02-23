import { unauthorizedResponse } from './responses/unauthorizedResponse.js';
import { userResponse } from './responses/userResponse.js';

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
        UnauthorizedError: unauthorizedResponse,
        User: userResponse,
      },
    },
  },
  apis: ['./src/routes/*.js'],
};
