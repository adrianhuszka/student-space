import { deleteMessage } from "@/app/actions/forum-actions";
import { useQuery } from "@tanstack/react-query";

export function useDeleteForumMessage({ id }: { id: string }) {
  return useQuery({
    queryFn: async () => deleteMessage({ id }),
    queryKey: ["forum"],
  });
}
