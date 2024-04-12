import { httpGet, httpPost } from "@/lib/axios/services";
import { LoadingOverlay, Select, SelectProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { roles } from "db/schema";
import React, { memo } from "react";
import formatData from "utils/data-converter";
import { ActionQuery } from "../model";

interface Props extends SelectProps {
  dataSource?: ActionQuery<any>;
  labelKey?: string;
  valueKey?: string;
}

const StaticSelect = memo(
  ({ dataSource, valueKey = "id", labelKey = "id", ...props }: Props) => {
    const { isFetching, isLoading, data } = useQuery<any, any>({
      queryKey: dataSource?.queryKey ?? [],
      queryFn: async () => {
        // Choose the appropriate HTTP method function based on the queryType
        switch (dataSource?.method ?? "Get") {
          case "Get":
            return httpGet(dataSource?.url() ?? "/"); // Replace '' with the appropriate endpoint
          case "Post":
            return httpPost(dataSource?.url() ?? "/", {}); // Replace '' with the appropriate endpoint
          default:
            throw new Error(`Invalid queryType: ${dataSource?.method}`);
        }
      },
      enabled: !!dataSource,
    });
    return (
      <div className="form-field relative w-full">
        <LoadingOverlay visible={isFetching || isLoading} />
        <Select
          {...props}
          data={formatData({
            data,
            type: "options",
            labelKey,
            valueKey,
            placeHolderData: data ?? [],
          })}
        />
      </div>
    );
  }
);
StaticSelect.displayName = "StaticSelect";
export default StaticSelect;
