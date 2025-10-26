import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                const status = error?.response?.status ?? error?.status;
                if ((status === 429 || status === 503) && failureCount < 3) return true;
                return failureCount < 1;
            },
            refetchOnWindowFocus: false,
            staleTime: 3 * 1000 * 60,
            gcTime: 5 * 60_000,
        },
        mutations: {
            retry: (failureCount, error: any) => {
                const status = error?.response?.status ?? error?.status;
                return (status === 429 || status === 503) && failureCount < 3;
            },
        },
    },
});
