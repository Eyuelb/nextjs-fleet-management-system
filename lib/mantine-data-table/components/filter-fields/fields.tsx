"use client";

import React, { useState } from "react";
import { TextInput, Menu, ActionIcon, Stack, Group } from "@mantine/core";

import { IconFilter, IconX, IconCheck } from "@tabler/icons-react";
import { Column } from "@tanstack/react-table";
import { UseFormRegister } from "react-hook-form";
export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
  register: any;
}
interface FormField {
  name: string;
  label: string;
  value: any;
  [key: string]: any;
}
export const Field: React.FC<FormField> = (field) => {
  // eslint-disable-next-line

  return (
    <React.Fragment>
      <div>
        <label htmlFor={field.name}>{field.label}</label>
        <input {...field} />
      </div>
    </React.Fragment>
  );
};
