"use client";

import clsx from "clsx";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "../navigation";
import { useTranslations } from "next-intl";
import { Select, SelectItem } from "@nextui-org/select";

type Props = {
  items: string[];
  defaultValue: string;
  label: string;
};

export default function LocaleSwitchSelect({
  items,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const translate = useTranslations("locale-switch");

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  // return (
  //   <label
  //     className={clsx(
  //       "relative text-gray-400",
  //       isPending && "transition-opacity [&:disabled]:opacity-30"
  //     )}
  //   >
  //     <p className="sr-only">{label}</p>
  //     <select
  //       className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
  //       defaultValue={defaultValue}
  //       disabled={isPending}
  //       onChange={onSelectChange}
  //     >
  //       {items.map((cur) => (
  //         <option key={cur} value={cur}>
  //           {translate("locale", { locale: cur })}
  //         </option>
  //       ))}
  //     </select>
  //     <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
  //   </label>
  // );
  return (
    <div
      className={clsx(
        "flex min-w-40 flex-wrap md:flex-nowrap gap-4",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <Select
        label={label}
        className="max-w-xs"
        onChange={onSelectChange}
        defaultSelectedKeys={[defaultValue]}
        size="sm"
        labelPlacement="inside"
      >
        {items.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {translate("locale", { locale: cur })}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
