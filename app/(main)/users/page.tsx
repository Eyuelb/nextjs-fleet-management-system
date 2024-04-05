"use client";
import { httpDelete, httpGet, httpPost, httpPut } from "@/lib/axios/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import TableComponent from "@/components/table";
import FormGenerator from "@/components/form";
import * as schema from "db/schema";
import SelectRole from "./_components/select-role";

const feat = "users";
const SchemaModel = schema[feat];
type SelectModel = typeof SchemaModel.$inferSelect;
type InsertModel = typeof SchemaModel.$inferInsert;
const PageComponent: React.FC = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [feat],
    queryFn: () => httpGet<SelectModel[]>(`/auth/${feat}`),
  });

  const { mutate: createFn, isPending } = useMutation({
    mutationKey: [feat],
    mutationFn: (data: InsertModel) => httpPost(`/auth/${feat}`, data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating", error);
    },
  });
  const { mutate: updateFn } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertModel }) =>
      httpPut(`/auth/${feat}?id=${id}`, data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating role:", error);
      alert("Failed to create role. Please check the console for details.");
    },
  });
  const { mutate: deleteFn } = useMutation({
    mutationFn: (id: string) => httpDelete(`/auth/${feat}/${id}`),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error on Deleting:", error);
    },
  });
  return (
    <div className="w-full">
      {isPending && <div>Loading...</div>}

      <FormGenerator
        defaultObject={{
          name: "",
          email: "",
        }}
        onSubmit={(data) => createFn(data)}
        fields={[
          (props) => (
            <SelectRole
              onChange={(data) =>
                props("roleID", {
                  value: data,
                })
              }
            />
          ),
        ]}
      />
      {isLoading && <div>Loading...</div>}
      <TableComponent data={data} onDelete={deleteFn} />
    </div>
  );
};

export default PageComponent;
