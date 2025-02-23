export const unauthorizedError = {
  description: 'Unauthorized, missing or invalid token',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Unauthorized'
          },
          status: {
            type: 'integer',
            example: 401
          },
          message: {
            type: 'string',
            example: 'User is not authorized'
          },
          path: {
            type: 'string',
            example: '/auth/me'
          },
          timestamp: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  }
}