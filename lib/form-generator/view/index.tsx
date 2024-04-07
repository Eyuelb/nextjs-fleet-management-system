import React from 'react';
import { generateField } from './generateField'; // Assuming generateField is in a separate file
import { useZodValidationFromFieldConfig } from '../schema/getZodValidation';
import { FormGeneratorProps } from '../model';
import useExtendedForm from '@/lib/react-form';
import { Button, LoadingOverlay, Text } from '@mantine/core';

const FormGenerator: React.FC<FormGeneratorProps<any>> = ({
  configs,
  defaultValues, // Accept defaultValues prop
  onSubmit,
  isLoading,
  submitBtnLabel = 'Submit',
  clearButtonLabel,
  className,
  fWrapperClassName,
  readonly,
}) => {
  const schema = useZodValidationFromFieldConfig(configs.fieldsConfig);
  const { Form, getInputProps, reset, watch } = useExtendedForm({
    defaultValues,
    validationSchema: configs.schema ?? schema,
    onSubmit,
  });

  //console.log(watch());

  return (
    <div
      className={`flex flex-col gap-2 max-w-[700px] px-4 relative ${className} `}
    >
      {isLoading && <LoadingOverlay visible />}
      <Text fw={500} fz={24}>
        {configs.title}
      </Text>
      <Form className={`form-wrapper ${fWrapperClassName}`}>
        {configs.fieldsConfig.map(config => (
          <div key={config.id} className="form-field">
            {generateField({
              ...config,
              ...getInputProps(config.id, 'select'),
              ...(readonly?.includes(config.id) ? { disabled: true } : {}),
            })}
          </div>
        ))}
        <div className="flex w-full justify-end gap-4">
          {clearButtonLabel && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                reset(defaultValues);
                onSubmit(defaultValues);
              }}
            >
              {clearButtonLabel}
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            {submitBtnLabel}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormGenerator;
