export const userResponse = {
  description: 'User object',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60d34c1f1f1f1f1f1f1f1f1f'
          },
          firstName: {
            type: 'string',
            example: 'John'
          },
          lastName: {
            type: 'string',
            example: 'Doe'
          },
          middleName: {
            type: 'string',
            example: 'Michael'
          },
          passportNumber: {
            type: 'string',
            example: 'AB123456'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com'
          },
          role: {
            type: 'string',
            enum: ['client', 'receptionist'],
            default: 'client'
          }
        }
      }
    }
  }
};