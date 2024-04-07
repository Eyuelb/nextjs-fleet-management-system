import {
  useForm,
  FieldValues,
  UseFormReturn,
  FieldErrors,
} from 'react-hook-form';
import React, { useRef } from 'react';
import {
  ExtendedFormMethods,
  ExtendedFormProps,
  FormComponent,
  GetInputProps,
} from './type';
import { zodResolver } from '@hookform/resolvers/zod';

function useExtendedForm<TFieldValues extends FieldValues, TContext = any>({
  onSubmit,
  validationSchema,
  defaultValues,
  ...props
}: ExtendedFormProps<TFieldValues, TContext>): UseFormReturn<TFieldValues> &
  ExtendedFormMethods<TFieldValues> {
  const methods = useForm<TFieldValues>({
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
    defaultValues,
    ...props,
  });

  const submitButtonRef = useRef<HTMLInputElement>(null);

  const customMethod = () => {
    onSubmit(methods.getValues());
  };

  const getInputProps: GetInputProps<TFieldValues> = (name, type) => {
    const fieldRegister = methods.register(name);
    const fieldState = methods.getFieldState(name, methods.formState);
    return {
      ...fieldRegister,
      ...(type === 'select' ||
      type === 'file' ||
      type === 'number' ||
      type === 'checkbox'
        ? { value: methods.getValues(name) }
        : {}),
      onBlur: async (event: {
        target: any;
        type?: any;
      }): Promise<boolean | void> => {
        return await fieldRegister.onBlur(event);
      },
      onFocus: async (event: {
        target: any;
        type?: any;
      }): Promise<boolean | void> => {
        return;
      },
      onChange:
        type === 'select' ||
        type === 'file' ||
        type === 'number' ||
        type === 'checkbox'
          ? async e => {
              console.log(fieldState);
              methods.setValue(name, e ?? '');
              return methods.trigger(name);
            }
          : fieldRegister.onChange,
      error:!!fieldState.error,
      helperText: fieldState.error?.message,
    };
  };

  const Form = ({
    className,
    children,
    onSubmitHandler,
    validOn,
    id,
  }: FormComponent<TFieldValues>): React.ReactNode => {
    const formId = Array.isArray(validOn) ? validOn.join(',') : validOn;

    const handleFormSubmit = (data: TFieldValues) => {
      onSubmit(data);
      onSubmitHandler && onSubmitHandler(data);
    };
    const onError = (errors?: FieldErrors<TFieldValues> | undefined) => {
      if (errors) {
        const isValid =
          validOn &&
          (Array.isArray(validOn)
            ? validOn.every(
                field =>
                  methods.getValues(field) && errors[field] === undefined,
              )
            : methods.getValues(validOn) && errors[validOn] === undefined);

        if (isValid) {
          if (onSubmitHandler) {
            Array.isArray(validOn)
              ? onSubmitHandler(methods.watch())
              : onSubmitHandler(methods.getValues(validOn));
          }
        } else {
          // console.log({ errors, isValid });
        }
      }
    };
    return (
      <form
        id={id}
        noValidate
        onSubmit={methods.handleSubmit(handleFormSubmit, onError)}
        className={className}
      >
        {children}
        <input type="submit" id={id} ref={submitButtonRef} hidden />
        {/* <DevTool control={methods.control} /> */}
      </form>
    );
  };

  const combinedMethods = React.useMemo(
    () => ({
      ...methods,
      customMethod,
      getInputProps,
      Form,
      submitButtonRef, // Include the ref in the returned methods
    }),
    [methods, submitButtonRef],
  );

  return {
    ...combinedMethods,
  };
}

export default useExtendedForm;
