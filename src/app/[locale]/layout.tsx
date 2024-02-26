import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { NextIntlClientProvider, useMessages } from "next-intl";
import clsx from "clsx";
import AuthStatus from "@/components/session/status";
import { Root } from "./layout.styles";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body className={clsx(Root(), fontSans.variable)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className={Root.Overlay()}>
              <AuthStatus wrapperStyle={Root.Loader()} spinnerSize="lg">
                {children}
              </AuthStatus>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
