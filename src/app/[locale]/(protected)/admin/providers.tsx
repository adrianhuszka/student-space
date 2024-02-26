"use client";

import { Layout } from "@/components/layout/admin-layout";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Layout>{children}</Layout>;
}
