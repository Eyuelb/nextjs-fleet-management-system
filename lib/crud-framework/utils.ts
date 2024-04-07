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
  obj: T,
  exclude: string[] = []
): { accessorKey: string; header: string }[] {
  return Object.entries(obj)
    .filter(([key]) => !exclude.includes(key)) // Filter out keys present in the exclude array
    .map(([key, value]) => ({
      accessorKey: key,
      header: formatHeaderText(key), // Apply formatting to header text
    }));
}

interface ColumnTypeConfig {
  name: string;
  dataType: string;
  // Add other properties as needed
}

interface ReturnType {
  id: any;
  label: string;
  type: any;
}

export function getFormTypeInfoModel(
  columnTypeConfig: ColumnTypeConfig[]
): ReturnType[] {
  return columnTypeConfig.map((config) => {
    const { name, dataType } = config;

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

    return {
      id,
      label,
      type,
    };
  });
}
