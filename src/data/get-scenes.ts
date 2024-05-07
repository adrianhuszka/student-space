import { getById, list } from "@/app/actions/scene-actions";
import { useQuery } from "@tanstack/react-query";

export function useListScenes() {
  return useQuery({
    queryFn: async () => list(),
    queryKey: ["scenes-list"],
  });
}

export function useGetSceneById(id: string) {
  return useQuery({
    queryFn: async () => getById(id),
    queryKey: ["scenes-get", id],
  });
}
