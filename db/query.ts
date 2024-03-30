import { QueryResult } from "pg";
import { connectToDatabase } from "./pool";

interface TableData {
  [key: string]: any;
}

interface Conditions {
  [key: string]: any;
}

const queryBuilder = {
  async create(table: string, data: TableData): Promise<TableData> {
    const pool = await connectToDatabase();
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
      const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
      const { rows }: QueryResult<TableData> = await pool.query(query, values);
      return rows[0];
    } finally {
      await pool.end();
    }
  },

  async read(table: string, conditions: Conditions = {}): Promise<TableData[]> {
    const pool = await connectToDatabase();
    try {
      const conditionColumns = Object.keys(conditions);
      const conditionValues = Object.values(conditions);
      const conditionPlaceholders = conditionColumns
        .map((column, index) => `${column} = $${index + 1}`)
        .join(" AND ");
      const query = `SELECT * FROM ${table}${
        conditionColumns.length ? ` WHERE ${conditionPlaceholders}` : ""
      }`;
      const { rows }: QueryResult<TableData> = await pool.query(
        query,
        conditionValues
      );
      return rows;
    } finally {
      await pool.end();
    }
  },

  async update(table: string, id: string, data: TableData): Promise<TableData> {
    const pool = await connectToDatabase();
    try {
      const columnsToUpdate = Object.keys(data);
      const valuesToUpdate = Object.values(data);
      const setValues = columnsToUpdate
        .map((column, index) => `${column} = $${index + 1}`)
        .join(", ");
      const query = `UPDATE ${table} SET ${setValues} WHERE id = $${
        columnsToUpdate.length + 1
      } RETURNING *`;
      const { rows }: QueryResult<TableData> = await pool.query(query, [
        ...valuesToUpdate,
        id,
      ]);
      return rows[0];
    } finally {
      await pool.end();
    }
  },

  async delete(table: string, id: string): Promise<TableData> {
    const pool = await connectToDatabase();
    try {
      const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
      const { rows }: QueryResult<TableData> = await pool.query(query, [id]);
      return rows[0];
    } finally {
      await pool.end();
    }
  },

  async getById(table: string, id: string): Promise<TableData> {
    const pool = await connectToDatabase();
    try {
      const query = `SELECT * FROM ${table} WHERE id = $1`;
      const { rows }: QueryResult<TableData> = await pool.query(query, [id]);
      return rows[0];
    } finally {
      await pool.end();
    }
  },
};

export default queryBuilder;
