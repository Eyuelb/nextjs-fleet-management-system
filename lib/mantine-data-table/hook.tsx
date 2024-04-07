import React, { memo, useState } from "react";
import { useToggle } from "@mantine/hooks";
import classes from "./style.module.scss";
import { useFullscreen } from "@mantine/hooks";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  getPaginationRowModel,
  ColumnDef
} from "@tanstack/react-table";
import { Box, Button, Flex, TextInput } from "@mantine/core";
import TableComponent from "./components/table";

interface MantineDataTableProps<T> {
  isLoading?: boolean;
  pinLastColumn?: boolean;
}
interface Props<T> {
  columns: ColumnDef<T>[];
}
const useMantineDataTable = <T extends Record<string, any>>({
  columns,
}: Props<T>) => {
  const { toggle, fullscreen } = useFullscreen();
  const [verticalSpacing, toggleDensity] = useToggle(["md", "xs", "sm"]);
  const [data, setData] = React.useState<T[]>([]);
  const [dataTotalCount, setDataTotalCount] = React.useState<number>(10);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  interface Field {
    key: string;
    value: string;
  }
  const [manualGlobalFilter, setManualGlobalFilter] = useState<{
    [key: string]: string;
  }>();
  console.log(manualGlobalFilter);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    rowCount: dataTotalCount,
    manualPagination: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const MantineDataTable = memo(
    <T extends Record<string, any>>(
      props: MantineDataTableProps<T>
    ): React.ReactNode => {
      return (
        <div className={classes.wrapper}>
          <div className={classes.toolbar}></div>
          <Flex justify="end" p={10}>
            {/* <GlobalFilterInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
          /> */}
          </Flex>
          <TableComponent table={table} isLoading={props.isLoading} />
        </div>
      );
    }
  );
  MantineDataTable.displayName = "MantineDataTable";
  return {
    MantineDataTable,
    setData,
    setSearchQuery: () => {},
    setTotalRecords: setDataTotalCount,
    setPageSize: () => {},
    setPageNumber: table.setPageIndex,
    searchQuery: "",
    pageNumber: table.getState().pagination.pageIndex,
    pageSize: table.getState().pagination.pageSize,
    sortStatus: {
      id: "uuid",
      direction: "asc",
    },
  };
};

export default useMantineDataTable;
