import { FieldValues } from 'react-hook-form';
import { FieldConfig } from '../model';
import { z } from 'zod';

export const useZodValidationFromFieldConfig = <T extends FieldValues>(
  fieldConfig: FieldConfig<T>[],
) => {
  // Extract validation schemas from field configurations
  const validationSchema = fieldConfig.reduce((acc: any, curr) => {
    if (curr.validationSchema) {
      acc[curr.id] = curr.validationSchema;
    }
    return acc;
  }, {});

  return z.object<T>(validationSchema);
};
