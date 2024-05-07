import { getMessages } from "@/app/actions/forum-actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ForumIndex } from ".";

export default async function Forum({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["forum-messages", { forumId: params.id }],
    queryFn: () =>
      getMessages({
        forumId: params.id,
        page: 0,
        size: 100,
        sort: "createdAt",
        direction: "ASC",
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ForumIndex id={params.id} />
    </HydrationBoundary>
  );
}
