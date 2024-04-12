import dayjs from 'dayjs';

type DataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'currency'
  | 'options'
  | 'getValue'; // Updated to 'getObject'

type FormattedData<T extends DataType> = T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : T extends 'boolean'
  ? boolean
  : T extends 'date'
  ? string
  : T extends 'currency'
  ? string
  : T extends 'options'
  ? { value: string; label: string }[]
  : T extends 'getValue' // Updated to 'getObject'
  ? any // Return type for 'getObject', can be any since it's dynamic
  : never;

type ObjWithKeys<T extends string, U extends string> = {
  [key in T]: string;
} & { [key in U]: string };

type getObject<T extends object, K extends keyof T> = T[K]; // Updated to getObject

interface FormatOptions<T extends DataType> {
  data: any;
  type: T;
  prefix?: string;
  valueKey?: string;
  labelKey?: string;
  placeHolderData?: FormattedData<T>; // New optional parameter
  dateFormat?: string; // New optional parameter for date formatting
}

function formatData<T extends DataType>({
  data,
  type,
  prefix,
  valueKey,
  labelKey,
  placeHolderData,
  dateFormat = 'MMMM DD, YYYY HH:mm:ss', // Default format
}: FormatOptions<T>): FormattedData<T> {
  switch (type) {
    case 'string':
      return String(data) as FormattedData<T>;
    case 'number':
      return Number(data) as FormattedData<T>;
    case 'boolean':
      return Boolean(data) as FormattedData<T>;
    case 'date':
      const date = dayjs(data, dateFormat);
      if (!date.isValid()) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error('Invalid date format');
      }
      return date.format(dateFormat) as FormattedData<T>;
    case 'currency':
      if (typeof data !== 'number') {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error('Data is not a number');
      }
      return ((prefix ? `${prefix} ` : '$ ') +
        data.toLocaleString(undefined, {
          useGrouping: true,
        })) as FormattedData<T>;
    case 'options':
      if (!Array.isArray(data)) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error('Data is not an array');
      }
      if (!valueKey || !labelKey) {
        throw new Error('Accessor keys not provided');
      }
      return convertArrayToObject(data, valueKey, labelKey) as FormattedData<T>;
    case 'getValue': // Updated to 'getObject'
      if (typeof data !== 'object' || !valueKey) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error('Value key not provided');
      }
      return getValue(data, valueKey) as FormattedData<T>;
    default:
      if (placeHolderData !== undefined) {
        return placeHolderData;
      }
      throw new Error('Unsupported data type');
  }
}
function getValue<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): getObject<T, K> {
  return obj[key];
}

function convertArrayToObject<T extends string, U extends string>(
  arr: ObjWithKeys<T, U>[],
  valueKey: T,
  labelKey: U,
): { value: string; label: string }[] {
  const uniqueValues = new Set<string>(); // Set to store unique values
  return arr
    .filter(obj => {
      const value = obj[valueKey];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value); // Add value to set if not already present
        return true; // Include the object if the value is unique
      }
      return false; // Exclude the object if the value is duplicate
    })
    .map(obj => ({
      value: obj[valueKey],
      label: obj[labelKey],
    }));
}
export default formatData;
