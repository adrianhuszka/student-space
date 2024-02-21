import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix, defaultLocale } from "@/config/i18n";
import { getToken } from "next-auth/jwt";

const publicPages = ["/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
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
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (req.nextUrl.pathname.endsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (isPublicPage) {
    return intlMiddleware(req);
  } else if (req.nextUrl.pathname === "/") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
