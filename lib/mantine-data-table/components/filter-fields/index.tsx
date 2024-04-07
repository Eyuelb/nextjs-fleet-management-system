//@ts-nocheck
import {
  Button,
  Flex,
  InputBase,
  InputLabel,
  InputWrapper,
  Text,
  TextInput,
} from "@mantine/core";
import React, { memo, useState } from "react";
import { fileSchema } from "../../../../shared/auth/schema/common-rules";
import { Column, ColumnDef, HeaderGroup } from "@tanstack/react-table";

interface FieldData {
  id: string;
  label: string;
}

interface FieldProps<T> {
  fieldData: FieldData[];
  setValue: React.Dispatch<
    React.SetStateAction<
      | {
          [key: string]: string;
        }
      | undefined
    >
  >;
  columns: ColumnDef<T>[];
  headerGroup: HeaderGroup<T>
}

const FieldComponent: React.FC<FieldProps> = memo(
  ({ fieldData, setValue, column,hederGroup }) => {
    const [fields, setFields] = useState<{ [key: string]: string }>(
      fieldData.reduce((acc, cur) => {
        //@ts-ignore
        acc[cur.id] = "";
        return acc;
      }, {})
    );

    const handleFieldChange = (id: string, value: string) => {
      setFields((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevents default form submission behavior
      setValue(fields); // Passes the form data to the onSubmit function
    };
    if (!column.getCanFilter()) {
      return null;
    }
    const renderFilterElement = () => {
      // eslint-disable-next-line
      const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

      if (!FilterComponent) {
        return (
          <TextInput
            id={column.id}
            autoComplete="off"
            
            value={fields[column.id]}
            onChange={(e) => handleFieldChange(column.id, e.target.value)}
          />
        );
      }

      return (
        <FilterComponent
          value={fields[column.id]}
          onChange={(e) => handleFieldChange(column.id, e.target.value)}
        />
      );
    };
    return (
      <div className="flex flex-col p-4 gap-2">
        <Text fw={600} fz={16}>
          Filter
        </Text>
        <br />

        <form className="w-full" onSubmit={handleFormSubmit}>
          <Flex className="gap-4">
            {fieldData.map((field, index) => (
              <InputWrapper key={index} size="sm" maw={180}>
                <InputLabel htmlFor={field.id}>{field.label}:</InputLabel>
                <InputBase
                  type="text"
                  id={field.id}
                  value={fields[field.id]}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              </InputWrapper>
            ))}
          </Flex>
          <Flex className="justify-end">
            <Button type="submit" w={80}>
              Submit
            </Button>
          </Flex>
        </form>
      </div>
    );
  }
);

FieldComponent.displayName = "FieldComponent";

export default FieldComponent;
