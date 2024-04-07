import React, { useMemo } from 'react';
import FormGenerator from '../../../../../../lib/form-generator/view';
import { FormConfig } from '../../../../../../lib/form-generator/model';
import { z } from 'zod';

type TFormValues = {
  centerName: string;
  regionUuid: string;
  wereda: string;
  subCity: string;
  houseNumber: string;
  centerType: string;
};
type Props = {
  defaultValues: TFormValues;
  onSubmit: (data: TFormValues) => void;
  title: string;
  isLoading?: boolean;
};
const FormPage = ({ defaultValues, onSubmit, title, isLoading }: Props) => {
  const formConfig: FormConfig = useMemo(
    () => ({
      title,
      fieldsConfig: [
        {
          id: 'centerName',
          label: 'Center Name',
          type: 'text',
          validationSchema: z.string().nonempty('Center Name is required'),
        },
        {
          id: 'regionUuid',
          label: 'Region',
          type: 'address-select',
          validationSchema: z.string().nonempty('Region is required'),
        },
        {
          id: 'wereda',
          label: 'Wereda',
          type: 'text',
          validationSchema: z.string().nonempty('Wereda is required'),
        },
        {
          id: 'subCity',
          label: 'Sub City',
          type: 'text',
          validationSchema: z.string().nonempty('Sub City is required'),
        },
        {
          id: 'houseNumber',
          label: 'House Number',
          type: 'text',
          validationSchema: z.string().nonempty('House Number is required'),
        },
        {
          id: 'centerType',
          label: 'Center Type',
          type: 'text',
          validationSchema: z.string().nonempty('Center Type is required'),
        },
      ],
    }),
    [],
  );

  return (
    <div className="rounded-lg bg-white shadow-md p-6">
      <FormGenerator
        defaultValues={defaultValues}
        configs={formConfig}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FormPage;
