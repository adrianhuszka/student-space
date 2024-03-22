import { getJoindGroups } from "@/app/actions/user-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetGroups() {
  return useQuery({
    queryFn: async () => getJoindGroups(),
    queryKey: ["user-group"],
  });
}
