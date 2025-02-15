import { body } from 'express-validator';

export const getOptionalDTO = (dto) => {
  return dto.map(validation => {
    const fieldName = validation.builder.fields[0];
    return body(fieldName)
      .optional()
      .custom((value, { req }) => {
        return validation.run(req);
      });
  });
};