import { Pool } from "pg";

export const connectToDatabase = async (): Promise<Pool> => {
  return await new Pool({
    user: "postgres",
    password: "kidus@DB21!",
    host: "localhost",
    port: 5432,
    database: "fms",
  });
};
