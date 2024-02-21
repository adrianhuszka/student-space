import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/config/i18n";
import LocaleSwitchSelect from "./locale-switch-select";

export default function LocaleSwitcher() {
  const translate = useTranslations("locale-switch");
  const locale = useLocale();

  return (
    <LocaleSwitchSelect
      defaultValue={locale}
      label={translate("label")}
      items={Array.from(locales)}
    />
  );
}
