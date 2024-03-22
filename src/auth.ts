import { jwtDecode } from "jwt-decode";
import { Account, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { encrypt } from "./utils/encription";
import { CustomJWT, CustomUser, CustomSession } from "./types";
import { cookies } from "next/headers";

async function refreshToken(token: CustomJWT) {
  const resp = await fetch(`${process.env.KEYCLOAK_TOKEN_URL}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
    method: "POST",
  });

  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  const newExpiresAt = Math.floor(Date.now() / 1000) + refreshToken.expires_in;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: newExpiresAt,
    refresh_token: refreshToken.refresh_token,
  };
}

function rememberMeCookie(data: string, rememberMe: boolean) {
  const cookieStore = cookies();

  if (rememberMe) {
    cookieStore.set("username", data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
    });
  } else {
    cookieStore.delete("username");
  }
}

const auth: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
        rememberMe: { type: "boolean" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.KEYCLOAK_TOKEN_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "password",
              client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
              username: credentials?.username ?? "",
              password: credentials?.password ?? "",
              scope: "openid",
            }),
          });
          const data = await res.json();
          if (data.error) throw data;
          const decoded = jwtDecode(data.access_token);

          rememberMeCookie(
            credentials?.username as string,
            credentials?.rememberMe === "true"
          );

          return {
            id: decoded.sub as string,
            access_token: data.access_token,
            id_token: data.id_token,
            expires_at: data.expires_in + Math.floor(Date.now() / 1000),
            refresh_token: data.refresh_token,
          };
        } catch (err) {
          console.error("err", err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      account!.user_id = user.id;
      account!.access_token = user.access_token;
      account!.id_token = user.id_token;
      account!.expires_at = user.expires_at;
      account!.refresh_token = user.refresh_token;
      return true;
    },
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.decoded = account.access_token && jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < (token.expires_at as number)) {
        return token;
      } else {
        console.log("refreshing token");
        try {
          const newToken = await refreshToken(token);

          console.log("newToken", newToken.expires_at);

          return newToken;
        } catch (err) {
          console.error("Error refreshing token", err);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomJWT;
    }) {
      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      session.roles = token.decoded?.realm_access?.roles;
      session.error = token.error;
      session.user = {
        name: token.decoded?.preferred_username,
        email: token.decoded?.email,
        image: token.decoded?.profile_picture,
        fullName: token.decoded?.given_name + " " + token.decoded?.family_name,
      };
      return session;
    },
    redirect({ url, baseUrl }) {
      const callbackUrl = new URL(url).searchParams.get("callbackUrl");

      if (callbackUrl === baseUrl) return baseUrl;

      return callbackUrl ? `${baseUrl}${callbackUrl}` : baseUrl;
    },
  },
};

export default auth;
