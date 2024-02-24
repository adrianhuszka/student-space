import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        {/* <NavbarWrapper>{children}</NavbarWrapper> */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </section>
    </SidebarContext.Provider>
  );
};
