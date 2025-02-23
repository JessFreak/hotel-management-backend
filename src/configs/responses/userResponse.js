export const userResponse = {
  description: 'User object',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier of the user',
      example: '60d34c1f1f1f1f1f1f1f1f1f'
    },
    firstName: {
      type: 'string',
      description: 'User\'s first name',
      example: 'John'
    },
    lastName: {
      type: 'string',
      description: 'User\'s last name',
      example: 'Doe'
    },
    middleName: {
      type: 'string',
      description: 'User\'s middle name (optional)',
      example: 'Michael'
    },
    passportNumber: {
      type: 'string',
      description: 'User\'s passport number',
      example: 'AB123456'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'User\'s email address',
      example: 'john.doe@example.com'
    },
    role: {
      type: 'string',
      enum: ['client', 'receptionist'],
      description: 'Role of the user within the system',
      default: 'client'
    }
  }
};
