import { httpRequest } from "./services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import type { AxiosRequestConfig } from "axios";
import type { QueryKey } from "@tanstack/react-query";

function App() {
  const defaultQueryFn = ({
    queryKey,
  }: {
    queryKey: QueryKey | (string | AxiosRequestConfig<any>)[];
  }): void | Promise<any> => {
    if (!queryKey || !queryKey.length) return;

    // @ts-ignore
    return httpRequest(...queryKey);
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
