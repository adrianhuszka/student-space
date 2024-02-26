import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { User } from "@nextui-org/user";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import LocaleSwitcher from "../localization/locale-switch";
import { ThemeSwitch } from "../theme-switch";
import { CustomSession } from "@/types";
import NextLink from "next/link";
import { link } from "@nextui-org/theme";
import { useTranslations } from "next-intl";

export default function UserDropdown({
  sessionData,
}: {
  sessionData: CustomSession | undefined;
}) {
  const translate = useTranslations("nav");

  async function onLogoutClick() {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }
  return (
    <Dropdown>
      <NavbarItem className="flex">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: false,
              src: sessionData?.user?.image,
              showFallback: true,
              name: undefined,
            }}
            className="transition-transform"
            description={"@" + sessionData?.user?.name}
            name={sessionData?.user?.fullName}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Dynamic Actions"
        disabledKeys={["profile-desc"]}
        closeOnSelect={false}
      >
        <DropdownItem key="profile-desc" showDivider className="h-14 gap-2">
          <p className="font-semibold">{translate("signed-in-as")}</p>
          <p className="font-semibold">
            {sessionData?.user?.fullName} ({sessionData?.user?.name})
          </p>
        </DropdownItem>
        <DropdownSection title={translate("preferences")} showDivider>
          <DropdownItem>
            <ThemeSwitch showText />
          </DropdownItem>
          <DropdownItem>
            <LocaleSwitcher />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title={translate("profile")} showDivider>
          <DropdownItem>
            <NextLink
              className={clsx(
                link({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium w-full"
              )}
              color="foreground"
              href="/profile"
            >
              {translate("profile")}
            </NextLink>
          </DropdownItem>
          <DropdownItem>
            <NextLink
              className={clsx(
                link({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium w-full"
              )}
              color="foreground"
              href="/settings"
            >
              {translate("settings")}
            </NextLink>
          </DropdownItem>
        </DropdownSection>
        {sessionData?.roles?.includes("ADMIN") && (
          <DropdownSection title={translate("administration")} showDivider>
            <DropdownItem>
              <NextLink
                className={clsx(
                  link({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium w-full"
                )}
                color="foreground"
                href="/admin/dashboard"
              >
                {translate("admin-panel")}
              </NextLink>
            </DropdownItem>
          </DropdownSection>
        )}
        <DropdownItem
          className="text-red-500"
          onClick={() => {
            onLogoutClick().then(() => signOut());
          }}
        >
          {translate("logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
