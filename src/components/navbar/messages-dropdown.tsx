import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
import { NavbarItem } from "@nextui-org/navbar";
import { Badge } from "@nextui-org/badge";
import { User } from "@nextui-org/user";
import { Messages1 } from "iconic-react";

export const MessageDropdown = () => {
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
            <Messages1 className="text-default-400 cursor-pointer" size={32} />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Messages">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
          >
            <User
              as="button"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                showFallback: true,
                radius: "lg",
              }}
              className="transition-transform"
              description="Last seen 2 hours ago"
              name="Tony Reichert"
            />
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
