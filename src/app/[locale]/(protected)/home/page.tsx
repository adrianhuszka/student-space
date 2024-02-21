import auth from "@/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(auth);
  return <p>Home</p>;
}
