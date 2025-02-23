export const notFoundError = {
  description: 'Entity not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Not Found'
          },
          status: {
            type: 'integer',
            example: 404
          },
          message: {
            type: 'string',
            example: 'User with such id not found'
          },
          path: {
            type: 'string',
            example: '/users/{id}'
          },
          timestamp: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  },
};
