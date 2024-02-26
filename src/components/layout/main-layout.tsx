"use client";

import { Link } from "@nextui-org/link";
import React from "react";
import { Navbar } from "@/components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <header className="fixed top-0 z-[500] w-[calc(100%-.66rem)] h-[4rem]">
        <Navbar />
      </header>
      <main className="flex-grow mt-[4rem]">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </>
  );
};
