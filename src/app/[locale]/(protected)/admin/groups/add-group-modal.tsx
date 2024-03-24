"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { FormEvent, useEffect, useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Group } from "../../../../../types/group-types";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { create } from "@/app/actions/group-actions";

export const AddGroup = ({
  isOpen,
  onOpenChange,
  groups,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groups: Group[];
}) => {
  const items: { id: string; name: string }[] = groups.map((group) => ({
    id: group.id,
    name: group.name,
  }));

  const initialState = {
    status: NaN,
  };

  items.unshift({ id: "none", name: "None" });

  const [state, formAction] = useFormState(create, initialState);

  useEffect(() => {
    if (state.status)
      switch (state.status) {
        case 201:
          toast.success("Successfully added group!");
          break;
        case 409:
          toast.error("Group already exists!");
          break;
        default:
          toast.error("Failed to add group!");
          break;
      }
  }, [state]);

  const modal = useMemo(() => {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="top-center"
        motionProps={{
          variants: {
            enter: {
              scale: "var(--scale-enter)",
              y: "var(--slide-enter)",
              opacity: 1,
              transition: {
                scale: { duration: 0.4, ease: [0.36, 0.66, 0.4, 1] },
                opacity: { duration: 0.4, ease: [0.36, 0.66, 0.4, 1] },
                y: { type: "spring", bounce: 0, duration: 0.6 },
              },
            },
            exit: {
              scale: "var(--scale-exit)",
              y: "var(--slide-exit)",
              opacity: 0,
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.4, 1] },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">
                Add Group
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  required
                  label="Name"
                  variant="bordered"
                  name="name"
                />
                <Select
                  label="Parent Group"
                  labelPlacement="outside-left"
                  size="md"
                  className="bg-transparent outline-none text-default-400 text-small"
                  name="parentGroup"
                  items={items}
                >
                  {(item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  type="reset"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    );
  }, [formAction, isOpen, items, onOpenChange]);

  return modal;
};
