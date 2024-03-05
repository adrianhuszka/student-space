"use client";

import { useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { Next13ProgressBar } from "next13-progressbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5,
            refetchInterval: 1000 * 5,
          },
        },
      })
  );

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>
        <NextThemesProvider {...themeProps}>
          <ToastContainer />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            {children}
          </QueryClientProvider>
          <Next13ProgressBar
            height="4px"
            color="#0A2FFF"
            options={{ showSpinner: false }}
            showOnShallow
          />
        </NextThemesProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
