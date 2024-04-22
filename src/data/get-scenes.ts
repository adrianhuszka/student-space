import { list } from "@/app/actions/scene-actions";
import { useQuery } from "@tanstack/react-query";

export function useListScenes() {
  return useQuery({
    queryFn: async () => list(),
    queryKey: ["scenes"],
  });
}
