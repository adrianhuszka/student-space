import auth from "@/auth";
import { getIdToken } from "@/utils/sessionTokenAccessor";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession(auth);

  if (session) {
    const idToken = await getIdToken();

    const url = `${process.env.KEYCLOAK_SESSION_END_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

    try {
      const resp = await fetch(url, { method: "GET" });
    } catch (error) {
      console.error("Failed to logout:", error);
      return new Response("Failed to logout", { status: 500 });
    }
  }
  return new Response("Logged out", { status: 200 });
}
