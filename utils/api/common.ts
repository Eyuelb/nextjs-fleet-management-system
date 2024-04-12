import dayjs from "dayjs";
import { PgColumn, PgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as schema from "db/schema";
import { ColumnBaseConfig, ColumnDataType, TableConfig } from "drizzle-orm";

export const commonInjection = {
  post: {
  },
  put: {
    updatedAt: dayjs().toDate(),
  },
};

export const validateSchema = (model:any) => ({
  insert: createInsertSchema(model),
  select: createSelectSchema(model),
});
