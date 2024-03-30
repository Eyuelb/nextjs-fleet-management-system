"use server";
import { Pool, QueryResult } from "pg";

interface TableData {
  [key: string]: any;
}

interface Conditions {
  [key: string]: any;
}

const pool = new Pool({
  user: "postgres",
  password: "kidus@DB21!",
  host: "localhost",
  port: 5432,
  database: "fms",
});




export const connectToDatabase = async () => {
  return await new Pool({
    user: "postgres",
    password: "kidus@DB21!",
    host: "localhost",
    port: 5432,
    database: "fms",
  });
};

export const handleConnectionTest = async () => {
  const db = await connectToDatabase();
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        email TEXT NOT NULL,
        emailVerified DATE,
        image TEXT
      )
    `);

    // Create accounts table
    await db.query(`
      CREATE TABLE IF NOT EXISTS "account" (
        userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        providerAccountId TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        PRIMARY KEY (provider, providerAccountId)
      )
    `);

    // Create sessions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        sessionToken TEXT PRIMARY KEY NOT NULL,
        userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        expires DATE NOT NULL
      )
    `);

    // Create verification tokens table
    await db.query(`
      CREATE TABLE IF NOT EXISTS "verificationToken" (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL,
        expires DATE NOT NULL,
        PRIMARY KEY (identifier, token)
      )
    `);

    console.log("Tables created successfully.");

  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    await db.end();
  }
};

export const queryBuilder = {
  async create(table: string, data: TableData): Promise<TableData> {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const { rows }: QueryResult<TableData> = await pool.query(query, values);
    return rows[0];
  },
  
  async read(table: string, conditions: Conditions = {}): Promise<TableData[]> {
    const conditionColumns = Object.keys(conditions);
    const conditionValues = Object.values(conditions);
    const conditionPlaceholders = conditionColumns.map((column, index) => `${column} = $${index + 1}`).join(' AND ');
    const query = `SELECT * FROM ${table}${conditionColumns.length ? ` WHERE ${conditionPlaceholders}` : ''}`;
    const { rows }: QueryResult<TableData> = await pool.query(query, conditionValues);
    return rows;
  },
  
  async update(table: string, id: string, data: TableData): Promise<TableData> {
    const columnsToUpdate = Object.keys(data);
    const valuesToUpdate = Object.values(data);
    const setValues = columnsToUpdate.map((column, index) => `${column} = $${index + 1}`).join(', ');
    const query = `UPDATE ${table} SET ${setValues} WHERE id = $${columnsToUpdate.length + 1} RETURNING *`;
    const { rows }: QueryResult<TableData> = await pool.query(query, [...valuesToUpdate, id]);
    return rows[0];
  },
  
  async delete(table: string, id: string): Promise<TableData> {
    const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
    const { rows }: QueryResult<TableData> = await pool.query(query, [id]);
    return rows[0];
  },
  
  async getById(table: string, id: string): Promise<TableData> {
    const query = `SELECT * FROM ${table} WHERE id = $1`;
    const { rows }: QueryResult<TableData> = await pool.query(query, [id]);
    return rows[0];
  }
};
