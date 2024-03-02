"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { Next13ProgressBar } from "next13-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>
        <NextThemesProvider {...themeProps}>
          <ToastContainer />
          {children}
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
