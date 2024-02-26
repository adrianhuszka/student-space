"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { Switch, SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunIcon } from "@/components/icons/theme/sun-icons";
import { MoonIcon } from "@/components/icons/theme/moon-icons";
import { useTranslations } from "next-intl";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
  showText?: boolean;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  showText = false,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const translate = useTranslations("theme");

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${
      theme === "light" || isSSR ? "dark" : "light"
    } mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        <Switch
          defaultSelected={isSelected || isSSR}
          onChange={onChange}
          size="lg"
          color="success"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
        >
          {showText && isSelected ? translate("light") : translate("dark")}
        </Switch>
      </div>
    </Component>
  );
};
