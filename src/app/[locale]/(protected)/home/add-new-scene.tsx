import { create } from "@/app/actions/scene-actions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const AddNewSceneModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const initialState = {
    name: "",
    description: "",
    status: 0,
  };

  const [state, formAction] = useFormState(create, initialState);

  useEffect(() => {
    if (state.status === 201) {
      toast.success("Scene added successfully");
      onOpenChange(false);
    } else if (state.status && state.status !== 201) {
      toast.error("Failed to add scene");
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
                Add Scene
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  required
                  label="Name"
                  variant="bordered"
                  name="name"
                />
                <Input
                  autoFocus
                  required
                  label="Description"
                  variant="bordered"
                  name="description"
                />
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
