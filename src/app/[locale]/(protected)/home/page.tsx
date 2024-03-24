import { Home } from "@/app/[locale]/(protected)/home";
import { getJoinedScenes } from "@/app/actions/user-actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-scenes"],
    queryFn: getJoinedScenes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
