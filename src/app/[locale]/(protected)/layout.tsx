import { MainLayout } from "@/components/layout/main-layout";
import { Navbar } from "@/components/navbar/Navbar.1";
import { Link } from "@nextui-org/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
