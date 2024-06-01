import { getMessages } from "@/app/actions/forum-actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ForumIndex } from ".";
import { getUserId } from "@/utils/sessionTokenAccessor";

export default async function Forum({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  const userID = await getUserId();

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
      <ForumIndex id={params.id} userId={userID} />
    </HydrationBoundary>
  );
}
