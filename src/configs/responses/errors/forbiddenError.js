export const forbiddenError = {
  description: 'Access forbidden: Receptionist only',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Forbidden'
          },
          status: {
            type: 'integer',
            example: 403
          },
          message: {
            type: 'string',
            example: 'Access forbidden: Receptionist only'
          },
          path: {
            type: 'string',
            example: '/rooms',
            method: 'post'
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
