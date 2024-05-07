import { getById, getMessages } from "@/app/actions/forum-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetForumById({ id }: { id: string }) {
  return useQuery({
    queryFn: async () => getById({ id }),
    queryKey: ["forum"],
  });
}

export function useGetForumMessages({
  forumId,
  page,
  size,
  sort,
  direction,
}: {
  forumId: string;
  page: number;
  size: number;
  sort: string;
  direction: string;
}) {
  return useQuery({
    queryFn: async () => getMessages({ forumId, page, size, sort, direction }),
    queryKey: ["forum-messages", forumId],
  });
}
