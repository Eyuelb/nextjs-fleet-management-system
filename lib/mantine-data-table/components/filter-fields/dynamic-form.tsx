import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field } from "./fields";

interface FormData {
  [key: string]: any;
}

interface FormField {
  name: any;
  label: any;
  value: any;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: SubmitHandler<FormData>;
}
const getDefaultValues = (fields: FormField[]): FormData => {
  const defaultValues = {};
  for (const field of fields) {
    //@ts-ignore
    defaultValues[field.name] = field.value;
  }
  return defaultValues;
};
const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: getDefaultValues(fields),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Field key={index} {...field} {...register(field.name)}  />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
