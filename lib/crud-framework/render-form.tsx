"use client";
import { httpDelete, httpGet, httpPost, httpPut } from "@/lib/axios/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import * as schema from "db/schema";
import FormGenerator from "@/lib/form-generator/view";
import { z } from "zod";
import { FormConfig } from "@/lib/form-generator/model";
import { Box, Paper } from "@mantine/core";
import { ActionQuery } from "./model";
import getQueryClient from "../react-query/queryClient";
import { FieldValues } from "react-hook-form";

export type RenderFormProps<T extends FieldValues> = {
  operation: "create" | "update";
  feat: any;
  actions?: {
    view?: ActionQuery<T>;
    create?: ActionQuery<T>;
    update?: ActionQuery<T>;
  };
  id?: string;
  defaultValues?: T;
  configs?: FormConfig<T>;
};
const RenderForm = <T extends FieldValues>({
  operation,
  feat,
  actions,
  id,
  defaultValues,
  configs,
}: RenderFormProps<T>) => {
  const SchemaModel = schema[feat as keyof typeof schema];
  type SelectModel = typeof SchemaModel.$inferSelect;
  type InsertModel = typeof SchemaModel.$inferInsert;

  const { data, isLoading } = useQuery({
    queryKey: [feat, id],
    queryFn: () => httpGet<T>(`/v1/${feat}/${id}`),
    enabled: operation === "update",
  });

  const method = actions ? actions[operation]?.method : "Post";
  const url = actions ? actions[operation]?.url(id as any) : "/";
  const mutationKey = actions ? actions[operation]?.queryKey : [];
  const { mutate, isPending } = useMutation({
    mutationKey: [feat, id],
    mutationFn: (data: T) => {
      switch (method) {
        case "Post":
          return httpPost(url ?? "/", data); // Replace '' with the appropriate endpoint
        case "Put":
          return httpPut(url ?? "/", data); // Replace '' with the appropriate endpoint
        default:
          throw new Error(`Invalid queryType: ${method}`);
      }
    },
    onSuccess: () => {
      const queryClient = getQueryClient;
      queryClient.invalidateQueries(feat);
    },
    onError: (error) => {
      console.error("Error creating", error);
    },
  });

  const formConfig: FormConfig<T> | undefined = useMemo(() => configs, [configs]);

  return (
    <Paper shadow="xs" py={5} className=" min-h-screen">
      {operation === "create" && formConfig && defaultValues && (
        <FormGenerator
          defaultValues={defaultValues}
          configs={formConfig}
          onSubmit={(data) => mutate(data)}
          isLoading={isPending}
        />
      )}
      {operation === "update" && data && formConfig && (
        <FormGenerator
          defaultValues={data}
          configs={formConfig}
          onSubmit={(data) => mutate(data)}
          isLoading={isPending || isLoading}
        />
      )}
    </Paper>
  );
};

export default RenderForm;
