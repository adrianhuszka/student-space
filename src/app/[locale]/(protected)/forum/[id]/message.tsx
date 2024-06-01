"use client";

import {
  deleteMessage,
  editForumMessage,
  likeMessage,
} from "@/app/actions/forum-actions";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import clsx from "clsx";
import { More, Like1, ArrowRight } from "iconic-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Message({
  message,
  userId,
}: {
  message: any;
  userId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message ?? "");

  const handleEditSave = async () => {
    const formData = new FormData();
    formData.append("id", message.id);
    formData.append("message", editedMessage);

    const status = await editForumMessage(formData);
    if (status === 200) {
      toast.success("Message modified successfully");
    } else {
      toast.error("Failed to modify message");
    }
    setIsEditing(false);
  };

  const handleLike = async () => {
    await likeMessage({ forumMessageId: message.id, isLike: true });
  };

  useEffect(() => {
    if (isConfirmed) {
      deleteMessage({ id: message.id });
    }
  }, [isConfirmed]);

  return (
    <>
      <div
        className={clsx(
          `flex flex-col gap-2 rounded-md m-5 bg-opacity-25 w-[75%] p-2`,
          message.senderId === userId
            ? "self-end bg-blue-800"
            : "self-start bg-gray-600"
        )}
      >
        <div className="flex flex-row gap-2 w-full">
          <Tooltip
            content={
              <div className="flex flex-col gap-2 p-2">
                {message.senderName}
                <Link as={NextLink} href={`/message/${message.senderId}`}>
                  Send message
                </Link>
              </div>
            }
            color={"default"}
            className="capitalize self-start"
            isDisabled={message.senderId === userId}
          >
            <User
              avatarProps={{
                isBordered: false,
                src: "",
                showFallback: true,
                name: undefined,
              }}
              className="transition-transform"
              classNames={{
                name: "hidden sm:block",
                description: "hidden sm:block",
              }}
              name={message.senderName}
            />
          </Tooltip>
          <div className="flex-grow" />
          {message.senderId === userId && (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <More color="white" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions">
                <DropdownItem
                  key="modify"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Modify
                </DropdownItem>
                <DropdownItem key="delete" color="danger" onClick={onOpen}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div className="text-start w-full">
          {isEditing ? (
            <form className="flex flex-row gap-2 max-h-60 border-b">
              <Textarea
                className="w-full bg-transparent border-none text-white min-h-24"
                name="modifiedMessage"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Button color="primary" onClick={handleEditSave}>
                  Save
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    console.log("Message modification canceled");
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <p className="whitespace-pre-line border-b py-5 px-2">
              {message.message || "No content"}
            </p>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <Tooltip content={"Like"} color={"success"} className="capitalize">
              <Button
                isIconOnly
                variant="light"
                color="success"
                onClick={handleLike}
              >
                <Like1
                  size="24"
                  variant={
                    message.likes.filter((item) => item.id === userId)
                      ? "Bold"
                      : "Outline"
                  }
                />{" "}
                ({message.likes.length})
              </Button>
            </Tooltip>
            <Tooltip
              content={"Reply"}
              color={"secondary"}
              className="capitalize"
            >
              <Button
                isIconOnly
                variant="light"
                color="secondary"
                onClick={() => console.log("Reply")}
              >
                <ArrowRight size="24" fill="#979797" />
              </Button>
            </Tooltip>
          </div>
          <div className="flex-grow" />
          <div>
            <Tooltip
              content={message.createdAt.split("T")[0].replaceAll("-", ". ")}
              color={"default"}
              className="capitalize"
            >
              <p>
                {message.createdAt
                  ? message.createdAt.split("T")[0] ===
                    new Date().toISOString().split("T")[0]
                    ? message.createdAt.split("T")[1].split(".")[0]
                    : message.createdAt
                        .split("+")[0]
                        .replace("T", " ")
                        .split(".")[0]
                        .replaceAll("-", ". ")
                  : "Unknown Date"}
              </p>
            </Tooltip>
            {message.updatedAt !== message.createdAt && (
              <Tooltip
                content={message.updatedAt
                  .split("+")[0]
                  .split(".")[0]
                  .replace("T", " ")
                  .replaceAll("-", ". ")}
                color={"default"}
                className="capitalize"
              >
                <p>(Modified)</p>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Are you sure you want to delete this message?"
        setIsConfirmed={setIsConfirmed}
      />
    </>
  );
}
