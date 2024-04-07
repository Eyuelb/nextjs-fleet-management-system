"use client";
import React, { useEffect, useMemo } from "react";
import useMantineDataTable from "@/lib/mantine-data-table/hook";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { httpGet, httpPost } from "../axios/services";
import { Flex } from "@mantine/core";
import {
  DeleteButton,
  UpdateButton,
  ViewButton,
} from "./components/action-button";
import { ActionQuery, ActionType } from "./model";

export type RenderTableProps<T> = {
  feat: string;
  columns?: ColumnDef<T>[];
  queryBuilder?: {
    list?: ActionQuery<T>;
    delete?: ActionQuery<T>;
  };
  actions?:{
    accessorKey?: string;
    handlers?:ActionType[]
  }
  allowedActions?:ActionType[]
};

const RenderTable = <T extends Record<string, any>>({
  feat,
  columns,
  actions,
  queryBuilder,
}: RenderTableProps<T>) => {
  const memoColumns = useMemo(() => columns ?? [], [columns]);
  const memoActionColumn = useMemo(
    () => [
      actions?.accessorKey
        ? {
            accessorKey: actions?.accessorKey ?? "id",
            header: "Actions",
            cell: (data: any) => (
              <Flex gap={5}>
                {actions.handlers?.includes('view') && <ViewButton id={data.renderValue()} path={feat} />}
                {actions.handlers?.includes('update') && <UpdateButton id={data.renderValue()} path={feat}/>}
                {queryBuilder?.delete && (
                  <DeleteButton
                    url={queryBuilder?.delete.url(data.renderValue())}
                    type={queryBuilder?.delete.method}
                    queryKey={feat}
                  />
                )}
              </Flex>
            ),
          }
        : "",
    ],
    [actions,feat]
  );
  const {
    MantineDataTable,
    setData,
    setSearchQuery,
    setTotalRecords,
    setPageSize,
    setPageNumber,
    searchQuery,
    pageNumber,
    pageSize,
    sortStatus,
  } = useMantineDataTable({
    //@ts-ignore
    columns: [...memoColumns, ...memoActionColumn.filter((action) => action)],
  });
  const { isFetching, isLoading, data } = useQuery<any, any>({
    queryKey:[feat],
    queryFn: async () => {
      // Choose the appropriate HTTP method function based on the queryType
      switch (queryBuilder?.list?.method ?? "Get") {
        case "Get":
          return httpGet(queryBuilder?.list?.url() ?? "/"); // Replace '' with the appropriate endpoint
        case "Post":
          return httpPost(queryBuilder?.list?.url() ?? "/", {}); // Replace '' with the appropriate endpoint
        default:
          throw new Error(`Invalid queryType: ${queryBuilder?.list?.method}`);
      }
    },
    enabled: !!queryBuilder?.list,
  });

  useEffect(() => {
    if (data) {
      setData(data);
      setTotalRecords(data.length);
    }

    return () => {};
  }, [data]);

  return <MantineDataTable isLoading={isLoading || isFetching} pinLastColumn />;
};

export default RenderTable;
