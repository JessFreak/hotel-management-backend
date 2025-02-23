export const discountResponse = {
  description: 'Discount object',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier of the discount',
            example: '60c72b2f9b1d8b8f1c8e4d0c',
          },
          name: {
            type: 'string',
            description: 'Name of the discount',
            example: 'Winter Sale',
          },
          percentage: {
            type: 'number',
            description: 'Percentage of the discount',
            example: 20,
          },
        },
        required: ['id', 'name', 'percentage'],
      },
    },
  },
};
