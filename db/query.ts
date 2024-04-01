import { connectToDatabase, getTable } from "./pool"; // Import the getTable function

interface QueryResult<T> {
  success: boolean;
  data?: T | null;
  message?: string;
  error?: any;
}

class QueryBuilder {
  private db: any; // Declare db property

  constructor() {
    this.initializeDb();
  }

  private async initializeDb() {
    try {
      this.db = await connectToDatabase(); // Initialize db asynchronously
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error; // Throw error to handle it outside the class if needed
    }
  }

  async create(tableName: string, data: any): Promise<QueryResult<void>> {
    try {
      const table = getTable(tableName); // Obtain table object from database setup
      const exciton = await this.db.insert(table).values(data);
      return { success: true, message: "Record created successfully" };
    } catch (error) {
      throw new Error("Error creating query: " + error);
    }
  }

  async read(
    tableName: string,
    conditions: Record<string, any> = {}
  ): Promise<QueryResult<any[]>> {
    try {
      const table = getTable(tableName); // Obtain table object from database setup
      const result = await this.db.select().from(table);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getById(tableName: string, id: string): Promise<QueryResult<any>> {
    try {
      const table = getTable(tableName); // Obtain table object from database setup
      const result = await this.db.select().from(table).where({ id }).single();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: "Error getting record by ID", error };
    }
  }

  async update(
    tableName: string,
    data: Record<string, any>,
    conditions: Record<string, any>
  ): Promise<QueryResult<void>> {
    try {
      const table = getTable(tableName); // Obtain table object from database setup
      await this.db.update(table).set(data).where(conditions);
      return { success: true, message: "Record updated successfully" };
    } catch (error) {
      return { success: false, message: "Error updating record", error };
    }
  }

  async delete(
    tableName: string,
    conditions: Record<string, any>
  ): Promise<QueryResult<void>> {
    try {
      const table = getTable(tableName); // Obtain table object from database setup
      await this.db.delete(table).where(conditions);
      return { success: true, message: "Record deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error deleting record", error };
    }
  }
}
const queryBuilder = new QueryBuilder();

export default queryBuilder;
