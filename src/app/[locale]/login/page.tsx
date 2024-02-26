import { useTranslations } from "next-intl";
import LoginForm from "../../../components/login/form";
import { ThemeSwitch } from "@/components/theme-switch";
import LocaleSwitcher from "@/components/localization/locale-switch";
import { cookies } from "next/headers";
import { Base } from "./layout.styles";

export default function LoginPage() {
  const translate = useTranslations("login-page");
  const cookieStore = cookies();

  const username = cookieStore.get("username")?.value;

  return (
    <>
      <div className={Base.Header()}>
        <h1 className={Base.Title()}>{translate("title")}</h1>
        <ThemeSwitch />
        <LocaleSwitcher />
      </div>
      <LoginForm username={username ?? ""} />
    </>
  );
}
