"use client";

import { useGetForumMessages } from "@/data/get-forum";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { createMessage } from "@/app/actions/forum-actions";
import { toast } from "react-toastify";
import Message from "./message";
import clsx from "clsx";
import useOnScreen from "@/hooks/useOnScreen";

export const ForumIndex = ({ id, userId }: { id: string; userId: string }) => {
  const { data, error, fetchStatus, refetch } = useGetForumMessages({
    forumId: id,
    page: 0,
    size: 100,
    sort: "createdAt",
    direction: "ASC",
  });
  const [initialScroll, setInitialScroll] = useState(true);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<any>(null);

  const lastMsg = useRef<HTMLDivElement | null>(null);

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (lastMessageDate === null && data.content.length > 0)
      setLastMessageDate(data.content[data.content.length - 1].createdAt);

    return data;
  }, [data, lastMessageDate]);

  const scroll = () => {
    if (lastMsg.current) {
      lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
      if (filteredData.content.length > 0) {
        setLastMessageDate(
          filteredData.content[filteredData.content.length - 1].createdAt
        );
      }
    }
  };

  useEffect(() => {
    if (initialScroll && filteredData.content) {
      scroll();
      setInitialScroll(false);
    }
  }, [filteredData, initialScroll]);

  useEffect(() => {
    console.log("lastMessageDate", lastMessageDate);
  }, [lastMessageDate]);

  const handleCreateMessage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("forumId", id);

    if (replyingTo) {
      formData.set("answerToId", replyingTo.id);
    }

    const res = await createMessage(formData);
    if (res === 200) {
      toast.success("Message sent successfully");
      e.target.reset();
      await refetch();
      scroll();
    } else {
      toast.error("Message could not be sent");
    }
    refetch();
  };

  if (!filteredData || !filteredData.content) return <div>Loading...</div>;

  return (
    <div className="flex grow justify-between flex-col text-center min-h-full my-14 p-5 max-w-[95rem] mx-auto w-full gap-6 bg-default-50 rounded-lg overflow-hidden">
      <div className="h-full grow shadow-glass rounded-lg bg-[#00000080] overflow-hidden">
        <div
          className={clsx(
            `flex flex-col overflow-y-auto`,
            filteredData.content.length > 0 &&
              lastMessageDate !==
                filteredData.content[filteredData.content.length - 1].createdAt
              ? `max-h-[63.49vh]`
              : `max-h-[65.49vh]`
          )}
        >
          {filteredData.content.map((message: any) => (
            <Message
              key={message.id}
              message={message}
              userId={userId}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          ))}
          <div ref={lastMsg} className="min-h-[10px]"></div>
        </div>
        {/* <div
          className={clsx(
            "text-red-600 bg-slate-950 shadow-glass w-full rounded-b-lg cursor-pointer h-[2vh]",
            filteredData.content.length > 0 &&
              lastMessageDate ===
                filteredData.content[filteredData.content.length - 1]
                  .createdAt &&
              "hidden"
          )}
          onClick={scroll}
        >
          New message
        </div> */}
      </div>
      <form className="flex flex-row gap-2" onSubmit={handleCreateMessage}>
        <Textarea
          type="text"
          className="h-15"
          name="message"
          label={
            replyingTo && replyingTo.message.length > 100
              ? replyingTo.message.slice(0, 100) + "..."
              : replyingTo?.message
          }
        />
        <Button className="h-15" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
