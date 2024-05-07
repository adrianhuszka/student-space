"use client";

import { useGetForumMessages } from "@/data/get-forum";
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

  return <>{id}</>;
};
