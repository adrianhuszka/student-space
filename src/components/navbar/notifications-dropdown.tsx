import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
import { Notification } from "iconic-react";
import { NavbarItem } from "@nextui-org/navbar";
import { Badge } from "@nextui-org/badge";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <Badge
            content="5"
            color="danger"
            placement="bottom-right"
            className="cursor-pointer"
          >
            <Notification
              className="text-default-400 cursor-pointer"
              size={30}
            />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
