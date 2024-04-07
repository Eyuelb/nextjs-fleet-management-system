import React, { PropsWithChildren, ReactElement } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
export declare type ReactFC = (re: UseFormRegister<any>) => React.ReactNode;

interface FormGeneratorProps {
  defaultObject: { [key: string]: any };
  onSubmit: (data: any) => void;
  fields?: ReactFC[];
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  defaultObject,
  onSubmit,
  fields,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
      {Object.entries(defaultObject).map(([key, value]) => (
        <div key={key} className="mb-4 form-field">
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {key}
          </label>
          <input
            type="text"
            id={key}
            defaultValue={value}
            {...register(key)}
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
          />
        </div>
      ))}
      {fields &&
        fields.map((field, key) => (
          <React.Fragment key={key}>{field(register)}</React.Fragment>
        ))}
      <button
        type="submit"
        className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
