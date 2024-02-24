import React from "react";
import { Providers } from "./providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full">
      <div className="text-center justify-center w-full">
        <Providers>{children}</Providers>
      </div>
    </section>
  );
}
