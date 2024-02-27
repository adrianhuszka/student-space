import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { users } from "./data";
import React from "react";
import { Button } from "@nextui-org/button";

type User = (typeof users)[0];

export default function RenderCell({
  user,
  columnKey,
}: {
  user: User;
  columnKey: React.Key;
}) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const cellValue = user[columnKey as keyof User];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {user.team}
          </p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[user.status]}
          size="sm"
          variant="flat"
        >
          {cellValue}
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
      return cellValue;
  }
}
