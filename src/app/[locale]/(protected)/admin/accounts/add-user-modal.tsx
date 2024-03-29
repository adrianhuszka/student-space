"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Input } from "@nextui-org/input";
import { FormEvent, useEffect, useMemo } from "react";
import { create } from "@/app/actions/user-actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const AddUser = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const initialState = {
    status: NaN,
    errorMessage: "",
  };
  const [state, formAction] = useFormState(create, initialState);

  useEffect(() => {
    if (state.status) {
      console.log(state);
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
                Add Account
              </ModalHeader>
              <ModalBody>
                <Tabs aria-label="Options">
                  <Tab
                    key="userdata"
                    title="Userdata"
                    className="flex flex-col gap-3"
                  >
                    <Input
                      autoFocus
                      required
                      label="Username"
                      variant="bordered"
                      name="username"
                    />
                    <Input
                      required
                      label="Email"
                      type="email"
                      variant="bordered"
                      name="email"
                    />
                    <Input
                      required
                      label="Password"
                      type="password"
                      variant="bordered"
                      name="password"
                    />
                    <Input
                      required
                      label="Password"
                      type="password"
                      variant="bordered"
                      name="password2"
                    />
                  </Tab>
                  <Tab
                    key="personal-information"
                    title="Personal Information"
                    className="flex flex-col gap-3"
                  >
                    <Input
                      label="First Name"
                      variant="bordered"
                      name="first_name"
                      autoFocus
                    />
                    <Input
                      label="Last Name"
                      variant="bordered"
                      name="last_name"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      variant="bordered"
                      name="phone"
                    />
                  </Tab>
                </Tabs>
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
  }, [formAction, isOpen, onOpenChange]);

  return modal;
};
