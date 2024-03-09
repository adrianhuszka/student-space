import { list } from "@/app/actions/user-actions";
import AccountTableWrapper from "@/components/table/user/table";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const Accounts = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => list({ search: "", page: 0, size: 10 }),
  });

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="max-w-[95rem] mx-auto w-full px-1 md:px-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AccountTableWrapper />
        </HydrationBoundary>
      </div>
    </div>
  );
};
