// pages/[slug].tsx
"use client";
import React, { memo } from "react";
import RenderPage from "@/lib/crud-framework/render-page";
import * as schema from "db/schema";
import {
  getForeignKeyTableNames,
  getFormTypeInfoModel,
  transformModelToColumns,
} from "@/lib/crud-framework/utils";
import { createInsertSchema } from "drizzle-zod";
import { resetObjectValues } from "../../../../utils/object";

type Props = { params: { slug: string[] } };
const feat = "fleet";
const SchemaModel = schema[feat];
type InsertModel = typeof SchemaModel.$inferInsert;
const model = SchemaModel;
//  console.log(getForeignKeyTableNames(model))
// console.log(getFormTypeInfoModel(Object.values(model)))
console.log(model);
const Page = memo(({ params }: Props) => (
  <RenderPage<InsertModel>
    feat={feat}
    params={params}
    table={{
      columns: transformModelToColumns(model, ["id"]),
      actions: {
        accessorKey: "id",
      },
    }}
    queryBuilder={{
      list: {
        url: () => `/v1/${feat}`,
        method: "Get",
        queryKey: [feat],
        dataType: "un-paginated",
      },
      view: {
        url: (id) => `/v1/${feat}/${id}`,
        method: "Get",
        queryKey: [feat],
      },
      update: {
        url: (id) => `/v1/${feat}/${id}`,
        method: "Put",
        queryKey: [feat],
      },
      delete: {
        url: (id) => `/v1/${feat}/${id}`,
        method: "Delete",
        queryKey: [feat],
      },
      create: {
        url: () => `/v1/${feat}`,
        method: "Post",
        queryKey: [feat],
      },
    }}
    form={{
      configs: {
        fieldsConfig: getFormTypeInfoModel(model),
        schema: createInsertSchema(SchemaModel),
      },
      defaultValues: { ...resetObjectValues(model) },
      customFields: [
        {
          id: "driverId",
          label: "Driver",
          type: "select",
          dataSource: {
            url: () => `/v1/users`,
            method: "Get",
            queryKey: ["users"],
          },
          valueKey: "id",
          labelKey: "name",
        },
        {
          id: "routeId",
          label: "Route",
          type: "select",
          dataSource: {
            url: () => `/v1/routes`,
            method: "Get",
            queryKey: ["routes"],
          },
          valueKey: "id",
          labelKey: "name",
        },
        {
          id: "routeId",
          label: "Vehicle",
          type: "select",
          dataSource: {
            url: () => `/v1/vehicles`,
            method: "Get",
            queryKey: ["vehicles"],
          },
          valueKey: "id",
          labelKey: "name",
        },
      ],
    }}
  />
));
Page.displayName = "Page";
export default Page;
