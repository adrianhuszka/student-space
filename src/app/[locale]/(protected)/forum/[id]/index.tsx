"use client";

import { useGetForumMessages } from "@/data/get-forum";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import clsx from "clsx";
import { useMemo } from "react";
import { createMessage } from "@/app/actions/forum-actions";
import { toast } from "react-toastify";

export const ForumIndex = ({ id, userId }: { id: string; userId: string }) => {
  const { data, error, fetchStatus, refetch } = useGetForumMessages({
    forumId: id,
    page: 0,
    size: 100,
    sort: "createdAt",
    direction: "ASC",
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);

  const handleCreateMessage = async (e: any) => {
    e.preventDefault();
    console.log("Submit");
    const formData = new FormData(e.target);
    formData.set("forumId", id);
    const res = await createMessage(formData);
    if (res === 200) {
      toast.success("Message sent successfully");
      e.target.reset();
    } else {
      toast.error("Message could not be sent");
    }
    refetch();
  };

  return (
    <div className="flex grow justify-between flex-col text-center min-h-full my-14 p-5 max-w-[95rem] mx-auto w-full gap-6 bg-default-50 rounded-lg overflow-hidden">
      <div className="h-full grow shadow-glass rounded-lg bg-[#00000080] overflow-hidden">
        <div className="flex flex-col overflow-y-auto max-h-[67.195vh]">
          {filteredData &&
            filteredData.content &&
            filteredData.content.map((message: any) => (
              <div
                key={message.id}
                className={clsx(
                  `flex flex-col gap-2 rounded-md m-5 bg-opacity-25 w-[75%] p-3`,
                  message.senderId === userId
                    ? "self-end bg-blue-800"
                    : "self-start bg-gray-600"
                )}
              >
                <div className="flex flex-row gap-2">
                  <Tooltip
                    content={
                      <div className="flex flex-col gap-2 p-2">
                        {message.senderName}
                        <Link
                          as={NextLink}
                          href={`/message/${message.senderId}`}
                        >
                          Send message
                        </Link>
                      </div>
                    }
                    color={"default"}
                    className="capitalize"
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
                </div>
                <div className="self-start">
                  {message.message || "No content"}
                </div>
                <div className="self-end">
                  <Tooltip
                    content={message.createdAt
                      .split("T")[0]
                      .replaceAll("-", ". ")}
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
                </div>
              </div>
            ))}
        </div>
      </div>
      <form className="flex flex-row gap-2" onSubmit={handleCreateMessage}>
        <Input type="text" className="h-15" name="message" />
        <Button className="h-15" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
