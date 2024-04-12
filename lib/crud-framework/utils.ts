import { z } from "zod";

function formatHeaderText(header: string): string {
  // Split the header into words
  const words = header.split(/(?=[A-Z])/); // Split at capital letters

  // Capitalize the first letter of each word and join with space
  return words
    .map((word) => {
      // Ensure the word is not empty
      if (word.length > 0) {
        // Capitalize the first letter and concatenate with the rest of the word
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export function transformModelToColumns<T extends Record<string, any>>(
  model: T,
  exclude: string[] = []
): { accessorKey: string; header: string }[] {
  return Object.entries(model)
    .filter(([key]) => !exclude.includes(key)) // Filter out keys present in the exclude array
    .map(([key, value]) => ({
      accessorKey: key,
      header: formatHeaderText(key), // Apply formatting to header text
    }));
}

interface ColumnTypeConfig {
  name: string;
  dataType: string;
  columnType: string;
  // Add other properties as needed
}

interface ReturnType {
  id: any;
  label: string;
  type: any;
}

export function getFormTypeInfoModel<T extends Record<string, any>>(
  model: T,
  exclude: string[] = []
): ReturnType[] {
  exclude.push("id");
  exclude.push("createdAt");
  exclude.push("updatedAt");
  
  const columnTypeConfig = Object.values(model);
  const ownColumns = columnTypeConfig
    .filter((data) => !exclude.includes(data.name))
    .filter((column) => column.columnType !== "PgUUID");

  const foreignColumns = columnTypeConfig
    .filter((data) => !exclude.includes(data.name))
    .filter((column) => column.columnType === "PgUUID");
  console.log(ownColumns, foreignColumns);


  console.log(getForeignKeyTableNames(model))
  const formType = ownColumns.map((config) => {
    const { name, dataType, columnType } = config;

    // Derive id from name (assuming it's the same)
    const id = name;

    // Derive label from name, capitalize first letter
    const label = formatHeaderText(name);

    // Derive arrayType based on dataType
    // For demonstration, mapping some common data types
    let type: string;
    switch (dataType) {
      case "string":
        type = "text";
        break;
      case "number":
        type = "number";
        break;
      // Add more cases as needed
      default:
        type = "text";
    }
    if (columnType === "PgUUID") {
      // 
    }

    return {
      id,
      label,
      type,
    };
  });
  return formType;
}

export function getForeignKeyTableNames(table: any): string[] {
  const tableSymbols = Object.getOwnPropertySymbols(table);
  const pgInlineForeignKeysSymbol = tableSymbols.find(
    (sym) => sym.toString() === "Symbol(drizzle:PgInlineForeignKeys)"
  );
  if (!pgInlineForeignKeysSymbol) {
    console.error("PgInlineForeignKeys symbol not found");
    return [];
  }

  const foreignKeyReferences = table[pgInlineForeignKeysSymbol].map(
    (foreignKey: any) => foreignKey.reference()
  );
  const tableNames: string[] = [];

  for (const foreignKeyReference of foreignKeyReferences) {
    if (!foreignKeyReference) {
      console.error("Foreign key reference not found");
      continue;
    }

    const foreignTableSymbols = Object.getOwnPropertySymbols(
      foreignKeyReference.foreignTable
    );
    const foreignKeyTableNameSymbol = foreignTableSymbols.find(
      (sym) => sym.toString() === "Symbol(drizzle:Name)"
    );
    if (!foreignKeyTableNameSymbol) {
      console.error("Foreign key table name symbol not found");
      continue;
    }

    const foreignKeyTableName =
      foreignKeyReference.foreignTable[foreignKeyTableNameSymbol];
    tableNames.push(foreignKeyTableName);
  }

  return tableNames;
}
