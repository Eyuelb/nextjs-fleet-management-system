import {
  ChangeHandler,
  FieldValues,
  Path,
  RefCallBack,
  SubmitHandler,
} from "react-hook-form";
import { Schema, ZodType } from "zod";
import { DefaultValuesType } from "../react-form/type";
import { ActionQuery } from "../crud-framework/model";

// Define a union type for all supported field types
type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "static-select"


// Define an interface for a field option
interface FieldOption {
  label: string;
  value: any;
}

// Define an interface for the field configuration
export interface FieldConfig<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  label: string;
  type: FieldType;
  defaultValue?: TFormValues;
  options?: FieldOption[];
  validationSchema?: ZodType<any>; // Include validation schema property
  value?: any;
  onFocus?: (event: { target: any; type?: any }) => Promise<boolean | void>;
  onChange?: (props: ChangeHandler | any) => Promise<void | boolean>;
  error?: boolean | undefined;
  onBlur?: ChangeHandler;
  ref?: RefCallBack;
  min?: string | number | undefined;
  max?: string | number | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  pattern?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  helperText?: string;
  fieldPros?: {
    [key: string]: any;
  };
  dataSource?: ActionQuery<TFormValues>;
  labelKey?: string;
  valueKey?: string;
}
export interface FormGeneratorProps<TFormValues extends FieldValues> {
  configs: FormConfig<TFormValues>;
  defaultValues: DefaultValuesType<TFormValues>; // Infer the type of defaultValues from the passed data
  onSubmit: SubmitHandler<TFormValues>;
  isLoading?: boolean;
  submitBtnLabel?: string;
  className?: string;
  clearButtonLabel?: string;
  readonly?: string[];
  fWrapperClassName?: string;
  customFields?:FieldConfig<TFormValues>[]
}

// Define a type for the form configuration
export type FormConfig<TFormValues extends FieldValues> = {
  title?: string;
  grid?: string;
  fieldsConfig: FieldConfig<TFormValues>[];
  schema?: Schema<TFormValues>;
};
