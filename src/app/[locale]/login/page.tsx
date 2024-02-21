import { useTranslations } from "next-intl";
import LoginForm from "./login-form";
import { ThemeSwitch } from "@/components/theme-switch";
import LocaleSwitcher from "@/components/locale-switch";

export default function LoginPage() {
  const translate = useTranslations("login-page");

  return (
    <>
      <div className="flex flex-row mb-3 justify-between xs:flex-col">
        <h1 className="text-3xl">{translate("title")}</h1>
        <div className="flex flex-row gap-6">
          <ThemeSwitch />
          <LocaleSwitcher />
        </div>
      </div>
      <LoginForm />
    </>
  );
}
