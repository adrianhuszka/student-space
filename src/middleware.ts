import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale } from "@/config/i18n";
import { getToken } from "next-auth/jwt";
import { CustomJWT } from "./types";
import { Pages } from "./path-roles";

const publicPages = ["/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const authMiddleware = withAuth(
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const restrictedPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${Pages.flatMap((p) =>
      p.path === "/" ? ["", "/"] : p.path
    )
      .map((p) => `(${p}.*)`)
      .join("|")})/?$`,
    "i"
  );

  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isRestrictedPage = restrictedPathnameRegex.test(req.nextUrl.pathname);

  if (
    isRestrictedPage &&
    (!isAuthenticated ||
      !Pages.some((page) => {
        const pagePathRegex = new RegExp(
          `^(/(${locales.join("|")}))?/?(en|hu)?(${page.path})`,
          "i"
        );
        return (
          pagePathRegex.test(req.nextUrl.pathname) &&
          page.roles.some((role) =>
            (token as CustomJWT)?.decoded?.realm_access.roles.includes(role)
          )
        );
      }))
  ) {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  if (req.nextUrl.pathname.endsWith("/login") && isAuthenticated)
    return NextResponse.redirect(new URL("/", req.url));
  if (isPublicPage)
    return intlMiddleware(req);

  if (req.nextUrl.pathname === "/") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }
  
  return (authMiddleware as any)(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
