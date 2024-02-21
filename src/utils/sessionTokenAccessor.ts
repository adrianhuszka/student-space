import { getServerSession } from "next-auth";
import auth from "@/auth";
import { decrypt } from "./encription";

export async function getAccessToken() {
  const session = await getServerSession(auth);
  if (session) {
    const accessTokenDecrypted = decrypt((session as any).access_token);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(auth);
  if (session) {
    const idTokenDecrypted = decrypt((session as any).id_token);
    return idTokenDecrypted;
  }
  return null;
}
