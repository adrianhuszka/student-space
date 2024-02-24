"use client";

import { siteConfig } from "@/config/site";
import React from "react";
import { SunIcon as CircleIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";

const Sidenav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.includes(href);
  };

  return (
    <aside className="hidden lg:block w-64 p-4 h-screen fixed top-16">
      <Listbox
        aria-label="User Menu"
        // onAction={(key) => alert(key)}
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80 data-[hover=true]:text-primary/80",
        }}
      >
        <ListboxSection showDivider>
          {siteConfig.navMenuItems.slice(0, 4).map((item) => (
            <ListboxItem
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "text-primary/90" : ""}
              startContent={
                <div
                  className={
                    isActive(item.href)
                      ? "bg-primary/10 text-primary/90"
                      : "bg-content2"
                  }
                >
                  <CircleIcon className="text-lg" />{" "}
                  {/* render unique icons based on route as desired */}
                </div>
              }
            >
              {item.label}
            </ListboxItem>
          ))}
        </ListboxSection>
        <ListboxSection showDivider>
          {siteConfig.navMenuItems.slice(4, 7).map((item) => (
            <ListboxItem
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "text-primary/90" : ""}
              startContent={
                <div
                  className={
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "bg-content2"
                  }
                >
                  <CircleIcon className="text-lg " />
                </div>
              }
            >
              {item.label}
            </ListboxItem>
          ))}
        </ListboxSection>
        <ListboxSection>
          {siteConfig.navMenuItems.slice(7).map((item) => (
            <ListboxItem
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "text-primary/90" : ""}
              startContent={
                <div
                  className={
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "bg-content2"
                  }
                >
                  <CircleIcon className="text-lg " />
                </div>
              }
            >
              {item.label}
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
    </aside>
  );
};

export default Sidenav;
