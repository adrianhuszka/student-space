import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

export default function ConfirmationModal({
  isOpen,
  onOpenChange,
  title,
  setIsConfirmed,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  setIsConfirmed: (isConfirmed: boolean) => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to do this?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                name="Confirm"
                onPress={() => {
                  setIsConfirmed(true);
                  onClose();
                }}
              >
                Confirm
              </Button>
              <Button
                color="primary"
                name="Cancel"
                onPress={() => {
                  setIsConfirmed(false);
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
