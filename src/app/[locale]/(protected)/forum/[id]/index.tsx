"use client";

import { useGetForumMessages } from "@/data/get-forum";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useMemo } from "react";

export const ForumIndex = ({ id }: { id: string }) => {
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

  console.log(filteredData);

  return (
    <div className="flex grow justify-between flex-col text-center min-h-full my-14 p-5 max-w-[95rem] mx-auto w-full gap-6 bg-default-50">
      <div className="h-full grow shadow-glass rounded-lg bg-[#00000080]">
        <div className="flex flex-col gap-4">
          {filteredData &&
            filteredData.content &&
            filteredData.content.map((message: any) => (
              <div
                key={message.id}
                className="flex flex-col gap-2 rounded-md m-5 bg-gray-600 bg-opacity-25"
              >
                <div className="flex flex-row gap-2">
                  <div>{message.senderName || "Unknown User"}</div>
                  <div>{message.createdAt || "Unknown Date"}</div>
                </div>
                <div>{message.message}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Input type="text" className="h-15" />
        <Button className="h-15">Send</Button>
      </div>
    </div>
  );
};
