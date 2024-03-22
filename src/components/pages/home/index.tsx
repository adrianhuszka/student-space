import { list } from "@/app/actions/group-actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import CardElement from "./card-elements";
import { getJoindGroups } from "@/app/actions/user-actions";

export const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-groups"],
    queryFn: getJoindGroups,
  });

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Home</h3>
      <div className="max-w-[60rem] mx-auto w-full px-1 md:px-0 flex flex-col flex-1 gap-3">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CardElement />
          <CardElement />
          <CardElement />
          <CardElement />
          <CardElement />
          <CardElement />
          <CardElement />
        </HydrationBoundary>
      </div>
    </div>
  );
};
