import { list } from "@/app/actions/group-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetGroups({
  search,
  page,
  size,
}: {
  search?: string;
  page?: number;
  size?: number;
}) {
  return useQuery({
    queryFn: async () => list({ search, page, size }),
    queryKey: ["groups"],
  });
}
