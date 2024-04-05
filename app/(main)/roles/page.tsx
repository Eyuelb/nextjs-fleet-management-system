"use client";
import { httpDelete, httpGet, httpPost, httpPut } from "@/lib/axios/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import TableComponent from "@/components/table";
import FormGenerator from "@/components/form";
import * as schema from "db/schema";

const feat = "roles";
const SchemaModel = schema[feat];
type SelectModel = typeof SchemaModel.$inferSelect;
type InsertModel = typeof SchemaModel.$inferInsert;

const PageComponent: React.FC = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [feat],
    queryFn: () => httpGet<SelectModel[]>(`/v1/${feat}`),
  });

  const { mutate: createFn, isPending } = useMutation({
    mutationKey: [feat],
    mutationFn: (data: FormData) => httpPost(`/v1/${feat}`, data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating", error);
    },
  });
  const { mutate: updateFn } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertModel }) =>
      httpPut(`/v1/roles?id=${id}`, data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      alert("Failed to create role. Please check the console for details.");
    },
  });
  const { mutate: deleteFn } = useMutation({
    mutationFn: (id: string) => httpDelete(`/v1/${feat}/${id}`),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error on Deleting:", error);
    },
  });

  return (
    <div className="p-5">
      {isPending && <div>Loading...</div>}

      <FormGenerator
        defaultObject={{
          roleName: "",
        }}
        onSubmit={createFn}
      />
      {isLoading && <div>Loading...</div>}
      <TableComponent data={data} onDelete={deleteFn} />
    </div>
  );
};

export default PageComponent;
