import { Pathnames } from "next-intl/navigation";

export const locales = ["hu", "en"] as const;

export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "as-needed";

export const defaultLocale = "hu" as const;

export type AppPathnames = keyof typeof pathnames;
