// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import http from "../axios";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount:true,
        refetchOnReconnect: false,
        retry: false,
        retryDelay: 15000,
        staleTime: 5 * 60 * 1000,
        queryFn: defaultQueryFn,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  console.log(queryKey);
  const res = await http.get(queryKey.join());
  console.log(res);
  return res;
};
// cache() is scoped per request, so we don't leak data between requests
const getQueryClient:QueryClient = makeQueryClient();
export default getQueryClient;
