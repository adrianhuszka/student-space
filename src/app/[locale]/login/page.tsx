import { useTranslations } from "next-intl";
import LoginForm from "./login-form";
import { ThemeSwitch } from "@/components/theme-switch";
import LocaleSwitcher from "@/components/locale-switch";
import { cookies } from "next/headers";

export default function LoginPage() {
  const translate = useTranslations("login-page");
  const cookieStore = cookies();

  const username = cookieStore.get("username")?.value;

  return (
    <>
      <div className="flex sm:flex-row mb-3 justify-between flex-col gap-2">
        <h1 className="text-2xl">{translate("title")}</h1>
        <ThemeSwitch />
        <LocaleSwitcher />
      </div>
      <LoginForm username={username ?? ""} />
    </>
  );
}
