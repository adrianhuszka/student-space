import { getById } from "@/app/actions/forum-actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export const Forum = async (id: string) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["forum"],
      queryFn: () => getById({ id }),
    });

    return (
        <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>Test</div>
        </HydrationBoundary>
        </>
    )
}