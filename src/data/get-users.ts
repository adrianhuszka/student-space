import { getProfilePicture, list } from "@/app/actions/user-actions";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers({
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
    queryKey: ["users"],
  });
}

export function useGetProfilePicture(userId: string) {
  return useQuery({
    queryFn: async () => getProfilePicture(userId),
    queryKey: ["profile-picture", userId],
  });
}
