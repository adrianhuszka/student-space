import { getById } from "@/app/actions/forum-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetForum({
  id
}: {
  id: string
}) {
  return useQuery({
    queryFn: async () => getById({ id }),
    queryKey: ["groups"],
  });
}
