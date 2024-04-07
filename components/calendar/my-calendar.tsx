"use client";
import dayjs from "dayjs";
import "dayjs/locale/am";
import { useEffect, useState } from "react";
import {
  Calendar,
  DateInput,
  DateInputProps,
  DatePickerInput,
  DatePickerInputFactory,
  DatePickerProps,
  DatesProvider,
} from "@mantine/dates";
interface MyCalendarProps extends DateInputProps{}

export default function MyCalendar(props: MyCalendarProps) {

  return (
    <DatesProvider
      settings={
        {
          // locale: "am",
          // firstDayOfWeek: 1,
          // weekendDays: [0],
          // timezone: "UTC"
        }
      }
    >
      <DateInput
        valueFormat="YYYY/MM/DD"     
        {...props}
      />
    </DatesProvider>
  );
}
