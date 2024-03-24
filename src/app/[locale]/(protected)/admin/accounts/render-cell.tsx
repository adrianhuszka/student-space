import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { User as UserType } from "../../../../../types/user-types";
import React from "react";
import { Button } from "@nextui-org/button";

export default function RenderCell({
  user,
  columnKey,
}: {
  user: UserType;
  columnKey: React.Key;
}) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: user.attributes.profile_picture[0],
            name: undefined,
            showFallback: true,
          }}
          description={user.email}
          name={user.name}
        >
          {user.email}
        </User>
      );
    case "realmRoles":
      return (
        <div className="flex flex-1 gap-2">
          {user.realmRoles &&
            user.realmRoles.map((role) => (
              <Chip
                key={role.id}
                className="capitalize"
                color={role.name === "Admin" ? "danger" : "success"}
                size="sm"
                variant="flat"
              >
                {role.name}
              </Chip>
            ))}
        </div>
      );
    case "groups":
      return (
        <div className="flex flex-1 gap-2">
          {user.groups &&
            user.groups.map((group) => (
              <Chip
                key={group.id}
                className="capitalize"
                color={"primary"}
                size="sm"
                variant="flat"
              >
                {group.name}
              </Chip>
            ))}
        </div>
      );
    case "attributes":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {user.attributes.phoneNumber}
          </p>
        </div>
      );
    case "enabled":
      return (
        <Chip
          className="capitalize"
          color={user.enabled == true ? "success" : "danger"}
          size="sm"
          variant="flat"
        >
          {user.enabled == true ? "active" : "disabled"}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <div>
            <Tooltip content="Details" color="primary">
              <Button
                onClick={() => console.log("View user", user.id)}
                isIconOnly
                aria-label="View user"
                variant="light"
                color="primary"
              >
                <EyeIcon size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <Button
                onClick={() => console.log("Edit user", user.id)}
                isIconOnly
                aria-label="Edit user"
                variant="light"
                color="secondary"
              >
                <EditIcon size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete user" color="danger">
              <Button
                onClick={() => console.log("Delete user", user.id)}
                isIconOnly
                aria-label="Delete user"
                variant="light"
                color="danger"
              >
                <DeleteIcon size={20} fill="#FF0080" />
              </Button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return <div>Undable to render this cell</div>;
  }
}
