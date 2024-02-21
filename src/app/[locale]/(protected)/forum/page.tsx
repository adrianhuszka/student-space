import auth from "@/auth";
import { getServerSession } from "next-auth";

export default async function Forum() {
  const session = await getServerSession(auth);
  return <p>Fórum</p>;
}
