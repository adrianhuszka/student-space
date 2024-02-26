"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { User } from "@nextui-org/user";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons/searchicon";

import { Logo } from "@/components/icons/logo";
import LocaleSwitcher from "../localization/locale-switch";
import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { useEffect, useState } from "react";
import { CustomSession } from "@/types";
import UserDropdown from "./user-dropdown";
import { NotificationsDropdown } from "./notifications-dropdown";
import { MessageDropdown } from "./messages-dropdown";

export const Navbar = () => {
  const translate = useTranslations("nav");
  const session = useSession();
  const [sessionData, setSessionData] = useState<CustomSession>();

  useEffect(() => {
    if (session.status === "authenticated") {
      setSessionData(session.data);
    }
  }, [session]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className=" hidden sm:flex justify-start items-center gap-1"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Student Space</p>
          </NextLink>
        </NavbarBrand>
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarContent>
          <ul className="hidden sm:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {translate(item.label)}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent className="flex basis-full" justify="end">
        <MessageDropdown />
        <NotificationsDropdown />
        <UserDropdown sessionData={sessionData} />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink color={"foreground"} href="#">
                {translate(item.label)}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
