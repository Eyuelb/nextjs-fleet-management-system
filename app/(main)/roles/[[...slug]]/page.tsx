// pages/[slug].tsx
"use client";
import React, { memo } from "react";
import RenderPage from "@/lib/crud-framework/render-page";
import * as schema from "db/schema";
import {
  getFormTypeInfoModel,
  transformModelToColumns,
} from "@/lib/crud-framework/utils";
import { createInsertSchema } from "drizzle-zod";
import { resetObjectValues } from "../../../../utils/object";
import { commonInjection, validateSchema } from "utils/api/common";

type Props = { params: { slug: string[] } };
const feat = "roles";
const model = schema[feat];
type InsertModel = typeof model.$inferInsert;
console.log(commonInjection.put.updatedAt)

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
        schema: createInsertSchema(model),
      },
      defaultValues: { ...resetObjectValues(model) },
    }}
  />
));
Page.displayName = "Page";
export default Page;
