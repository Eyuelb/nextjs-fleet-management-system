export type QueryType = "Get" | "Post" | "Put" | "Delete";
export type ActionType = "view" | "create" | "update" | "delete";

export type ActionQuery<T> = {
  url: (data?: string) => string;
  method: QueryType;
  queryKey: string[];
  dataType?: "paginated" | "un-paginated";
};