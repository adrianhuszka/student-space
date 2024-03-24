import { getServerSession } from "next-auth";
import auth from "@/auth";
import { decrypt } from "./encription";
import { CustomSession } from "@/types";

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

export async function getUserId() {
  const session = await getServerSession(auth);
  if (session) {
    const userId = (session as CustomSession).user_id;
    return userId;
  }
  return null;
}
