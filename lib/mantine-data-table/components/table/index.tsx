"use client";

import React from "react";
import { flexRender, Table as TanStack } from "@tanstack/react-table";
import {
  Box,
  Group,
  Table,
  Select,
  Pagination,
  Flex,
  InputWrapper,
  InputLabel,
  Skeleton,
} from "@mantine/core";
import { ColumnFilter, ColumnSorter } from "../column";

type TableComponentProps<T> = {
  table: TanStack<T>;
  isLoading?: boolean;
};
const TableComponent = <T extends Record<string, any>>({
  table,
  isLoading,
}: TableComponentProps<T>) => (
  <Box  bg={'var(--card-color-body)'}>
    <Table.ScrollContainer minWidth={500}>
      <Table
        highlightOnHover
        captionSide="bottom"
        style={{
          "--_thead-bg": "var(--mantine-color-gray-3)",
        }}
      >
        <Table.Thead fz={12}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id} className=" flex-grow">
                  {!header.isPlaceholder && (
                    <Flex gap="5">
                      <Box className=" w-fit">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Box>
                      <Group>
                        <ColumnSorter column={header.column} />
                        {/* <ColumnFilter column={header.column} /> */}
                      </Group>
                    </Flex>
                  )}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>

        <Table.Tbody>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <Table.Tr key={index}>
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <Table.Td key={header.id}>
                        <Skeleton
                          height={8}
                          mt={6}
                          width="70%"
                          radius="xl"
                          styles={{
                            root: {
                              border: "0px transparent",
                            },
                          }}
                        />
                      </Table.Td>
                    ))
                  )}
                </Table.Tr>
              ))
            : table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {isLoading ? (
                        <Skeleton
                          height={8}
                          mt={6}
                          width="70%"
                          radius="xl"
                          styles={{
                            root: {
                              border: "0px transparent",
                            },
                          }}
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
        </Table.Tbody>

        <Table.Caption>
          <Flex
            justify="end"
            gap="sm"
            p={10}
            c="var(--mantine-color-text)"
            fz="md"
          >
            <InputWrapper
              styles={{
                root: {
                  display: "flex",
                  gap: 10,
                },
              }}
            >
              <InputLabel>Rows per page</InputLabel>
              <Select
                maw={20}
                value={table.getState().pagination.pageSize.toString()}
                onChange={(e) => {
                  table.setPageSize(parseFloat(e ?? ""));
                }}
                data={[10, 20, 30, 40, 50].map((pageSize) => ({
                  label: pageSize.toString(),
                  value: pageSize.toString(),
                }))}
              />
            </InputWrapper>

            <Pagination
              total={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(i) => table.setPageIndex(i - 1)}
            />
          </Flex>
        </Table.Caption>
      </Table>
    </Table.ScrollContainer>
  </Box>
);
export default TableComponent;
