import { getJoinedScenes } from "@/app/actions/user-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetScenes() {
  return useQuery({
    queryFn: async () => getJoinedScenes(),
    queryKey: ["user-scenes"],
  });
}
