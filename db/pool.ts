import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { Table } from "drizzle-orm";
import * as schema from "./schema";
// Define a map to store table objects
const tablesMap: { [key: string]: Table<any> } = schema;

// Function to retrieve table object by table name
export function getTable(tableName: string): Table<any> {
  const table = tablesMap[tableName];
  if (!table) {
    throw new Error(`Table '${tableName}' not found`);
  }
  return table;
}
export const connectToDatabase = async () => {
  const client = new Client({
    user: "postgres",
    password: "kidus@DB21!",
    host: "localhost",
    port: 5432,
    database: "fms",
  });
  await client.connect();
  const db = drizzle(client, {
    schema,
  });
  return db;
};
