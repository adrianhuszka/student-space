import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Group } from "../../../../../types/group-types";
import React from "react";
import { Button } from "@nextui-org/button";
import { remove } from "@/app/actions/group-actions";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight } from "iconic-react";

export default function RenderCell({
  group,
  columnKey,
  setSelectedGroup,
  selectedGroup,
  data,
}: {
  group: Group;
  columnKey: React.Key;
  setSelectedGroup: (group: Group | null) => void;
  selectedGroup: Group | null;
  data: Group[];
}) {
  const cellValue = group[columnKey as keyof Group];

  const handleDelete = async (groupId: string) => {
    const response = await remove(groupId);
    console.log(response);
    if (response.status)
      switch (response.status) {
        case 200:
          toast.success("Successfully deleted group!");
          break;
        default:
          toast.error("Failed to delete group!");
          break;
      }
  };

  switch (columnKey) {
    case "name":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{group.name}</p>
        </div>
      );
    case "members":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">PLACEHOLDER</p>
        </div>
      );
    case "realmRoles":
      return (
        <div className="flex flex-1 gap-2">
          {group.realmRoles &&
            group.realmRoles.map((role) => (
              <Chip
                key={role}
                className="capitalize"
                color={role === "Admin" ? "danger" : "success"}
                size="sm"
                variant="flat"
              >
                {role}
              </Chip>
            ))}
        </div>
      );
    case "path":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{group.path}</p>
        </div>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <div>
            <Tooltip content="Parent group" color="default">
              <Button
                onClick={() =>
                  setSelectedGroup(
                    data.find((g) => g.id === selectedGroup?.parentId) ||
                      data
                        .find((g) =>
                          g.subGroups.find(
                            (sg) => sg.id === selectedGroup?.parentId
                          )
                        )
                        ?.subGroups.find(
                          (sg) => sg.id === selectedGroup?.parentId
                        ) ||
                      null
                  )
                }
                isIconOnly
                aria-label="Parent group"
                variant="light"
                color="default"
                isDisabled={!group.parentId}
              >
                <ArrowLeft size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Details" color="primary">
              <Button
                onClick={() => console.log("View group", group.id)}
                isIconOnly
                aria-label="View group"
                variant="light"
                color="primary"
              >
                <EyeIcon size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit group" color="secondary">
              <Button
                onClick={() => console.log("Edit group", group.id)}
                isIconOnly
                aria-label="Edit group"
                variant="light"
                color="secondary"
              >
                <EditIcon size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete group" color="danger">
              <form>
                <Button
                  onClick={() => handleDelete(group.id)}
                  isIconOnly
                  aria-label="Delete group"
                  variant="light"
                  color="danger"
                >
                  <DeleteIcon size={20} fill="#FF0080" />
                </Button>
              </form>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Subgroups" color="default">
              <Button
                onClick={() => setSelectedGroup(group)}
                isIconOnly
                aria-label="Subgroups"
                variant="light"
                color="default"
                isDisabled={!group.subGroupCount}
              >
                <ArrowRight size={20} fill="#979797" />
              </Button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      if (typeof cellValue === "string" || typeof cellValue === "number")
        return cellValue;
  }
}
