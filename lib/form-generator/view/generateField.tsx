import MyCalendar from "@/components/calendar/my-calendar";
import {
  Checkbox,
  CheckboxGroup,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import React from "react";
import { FieldValues } from "react-hook-form";
import { FieldConfig } from "../model";

// Define a function to generate a single field component based on the configuration
export const generateField = <T extends FieldValues>(
  config: FieldConfig<T>
): JSX.Element | null => {
  const {
    id,
    label,
    type,
    required = false,
    defaultValue,
    options,
    validationSchema,
    ref,
    fieldPros,
    disabled = false,
    ...props
  } = config;

  const key = `${id}-${type}`;

  switch (type) {
    case "text":
      return (
        <TextInput
          key={key}
          id={id}
          label={label}
          type={type}
          required={required}
          onChange={(e) => {
            props.onChange && props.onChange(e.currentTarget.value);
          }}
          error={props.error && <span>{props.helperText}</span>}
          value={props.value}
          disabled={disabled}
        />
      );
    case "number":
      return (
        <NumberInput
          key={key}
          id={id}
          label={label}
          required={required}
          onChange={(value) => {
            props.onChange && props.onChange(value);
          }}
          error={props.error && <span>{props.helperText}</span>}
          value={props.value}
          disabled={disabled}
        />
      );
    case "email":
      return (
        <TextInput
          key={key}
          id={id}
          label={label}
          type={type}
          required={required}
          onChange={(e) => {
            props.onChange && props.onChange(e.currentTarget.value);
          }}
          error={props.error && <span>{props.helperText}</span>}
          value={props.value}
        />
      );
    case "password":
      return (
        <PasswordInput
          key={key}
          id={id}
          label={label}
          type={type}
          required={required}
          onChange={(e) => {
            props.onChange && props.onChange(e.currentTarget.value);
          }}
          error={props.error && <span>{props.helperText}</span>}
          value={props.value}
        />
      );
    case "textarea":
      return (
        <Textarea
          key={key}
          id={id}
          label={label}
          rows={2}
          required={required}
          onChange={(e) => {
            props.onChange && props.onChange(e.currentTarget.value);
          }}
          error={props.error && <span>{props.helperText}</span>}
          value={props.value}
          disabled={disabled}
        />
      );
    case "select":
      return (
        <Select
          key={key}
          label={label}
          data={options}
          error={props.error && <span>{props.helperText}</span>}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
          value={props.value}
          disabled={disabled}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          key={key}
          id={id}
          label={label}
          onChange={(e) => {
            props.onChange && props.onChange(e.currentTarget.checked);
          }}
        />
      );
    case "radio":
      return (
        <Radio.Group
          key={key}
          label={label}
          name={id}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
          value={props.value}
        >
          {options?.map((option: any) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </Radio.Group>
      );
    case "date":
      return (
        <MyCalendar
          size="md"
          leftSection={<IconCalendar size={17} />}
          styles={{
            input: {
              "--_input-bg": "#f5f7f9",
              "--_input-placeholder-color": "#72777c",
              fontWeight: 600,
            },
          }}
          defaultValue={dayjs(new Date()).toDate()}
          placeholder="Select Arrival Date"
          valueFormat="YYYY-MM-DD"
          minDate={dayjs(new Date()).toDate()}
          error={props.error && <span>{props.helperText}</span>}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
        />
      );
    default:
      return null;
  }
};
