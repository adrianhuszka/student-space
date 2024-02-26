"use client";

import { CustomSession } from "@/types";
import { Spinner } from "@nextui-org/spinner";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthStatus({
  children,
  wrapperStyle,
  spinnerSize,
}: {
  children: React.ReactNode;
  wrapperStyle?: string;
  spinnerSize?: "sm" | "md" | "lg";
}) {
  const { data, status } = useSession();

  async function keycloakLogout() {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  useEffect(() => {
    if (
      status !== "loading" &&
      data &&
      (data as CustomSession)?.error === "RefreshAccessTokenError"
    ) {
      keycloakLogout().then(() => signOut());
    }
  }, [data, status]);

  if (status === "authenticated" || status === "unauthenticated")
    return children;

  if (status === "loading")
    return (
      <div className={wrapperStyle}>
        <Spinner size={spinnerSize} color="primary" />
      </div>
    );
}
