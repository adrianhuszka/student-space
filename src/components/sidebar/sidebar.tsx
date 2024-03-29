import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "@/components/icons/sidebar/home-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "@/components/layout/layout-context";
import { ChangeLogIcon } from "@/components/icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "@/components/icons/sidebar/accounts-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-full z-[202] fixed top-0 mt-16">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname.endsWith("/admin/dashboard")}
              href="dashboard"
            />
            <SidebarMenu title="Main menu">
              <SidebarItem
                isActive={pathname.endsWith("/admin/accounts")}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname.endsWith("/admin/groups")}
                title="Groups"
                icon={<AccountsIcon />}
                href="groups"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
              <SidebarItem
                title="Keycloak Admin Panel"
                icon={<AccountsIcon />}
                href="http://138.3.248.186:8888/admin/StudentSpace/console/"
                taget="_blank"
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
