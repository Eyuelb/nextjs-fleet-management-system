import { PropsWithChildren } from "react";
import {
  ChangeHandler,
  DefaultValues,
  FieldPath,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormProps,
  UseFormRegisterReturn,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { Schema, z } from "zod";

type GetInputPropsType = "input" | "select" | "checkbox" | "file" | "number";

export type GetInputProps<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TFieldName,
  type?: GetInputPropsType
) => {
  value?: any;
  onFocus?: (event: { target: any; type?: any }) => Promise<boolean | void>;
  onChange: (props: ChangeHandler | any) => Promise<void | boolean>;
  error: boolean | undefined;
} & UseFormRegisterReturn<TFieldName>;

export type ExtendedFormMethods<TFieldValues extends FieldValues> = {
  customMethod: () => void;
  getInputProps: GetInputProps<TFieldValues>;
  Form: ({
    className,
    children,
  }: FormComponent<TFieldValues>) => React.ReactNode;
  // Form: React.ForwardRefExoticComponent<FormComponent & React.RefAttributes<HTMLInputElement>>
  submitButtonRef: React.RefObject<HTMLInputElement>;
};
export type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

type DefaultValuesSchema<T extends z.ZodRawShape> = {
  [k_1 in keyof z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k] ? never : k; }[keyof T]>]: z.objectUtil.addQuestionMarks<any>[k_1];
};
export type DefaultValuesType<TFormValues extends z.ZodRawShape> =
  | DefaultValues<TFormValues>
  | AsyncDefaultValues<TFormValues> | DefaultValuesSchema<TFormValues>;

export type ExtendedFormProps<TFormValues extends FieldValues, TContext> = {
  onSubmit: SubmitHandler<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  defaultValues: DefaultValuesType<TFormValues>;
} & UseFormProps<TFormValues, TContext>;

export interface FormComponent<TFormValues extends FieldValues>
  extends PropsWithChildren {
  className?: string;
  onSubmitHandler?: SubmitHandler<TFormValues>;
  validOn?: FieldPath<TFormValues> | FieldPath<TFormValues>[];
  id?: string;
}

export interface FormContextType<TFieldValues extends FieldValues>
  extends UseFormReturn<TFieldValues, any, any> {
  getInputProps: GetInputProps<TFieldValues>;
  Form: ({
    className,
    children,
  }: FormComponent<TFieldValues>) => React.ReactNode;
  submitButtonRef: React.RefObject<HTMLInputElement>;
  control: any; // Replace 'any' with the correct type
  formState: any; // Replace 'any' with the correct type
  setValue: UseFormSetValue<TFieldValues>;
  values: TFieldValues;
}
