export const toJSONTransform = (schema, additionalFieldsToRemove = []) => {
  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      additionalFieldsToRemove.forEach(field => delete ret[field]);

      return ret;
    }
  });
};
