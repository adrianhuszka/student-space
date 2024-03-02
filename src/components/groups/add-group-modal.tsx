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
import { FormEvent, useCallback, useMemo, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

export const AddGroup = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selected, setSelected] = useState<string[]>(["none"]);

  const addGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(data.get("name"));
    console.log(data.get("parentGroup"));
  };

  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "") return;
      setSelected([e.target.value]);
    },
    []
  );

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
            <form onSubmit={addGroup}>
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
                  defaultSelectedKeys={["none"]}
                  selectedKeys={selected}
                  value={selected}
                  onChange={onSelectChange}
                  name="parentGroup"
                >
                  <SelectItem key="none" value="none">
                    None
                  </SelectItem>
                  <SelectItem key="1" value="1">
                    Group 1
                  </SelectItem>
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
  }, [isOpen, onOpenChange, onSelectChange, selected]);

  return modal;
};
