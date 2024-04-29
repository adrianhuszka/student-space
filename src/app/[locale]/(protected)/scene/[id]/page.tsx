import { Scene as SceneType } from "@/types";
import SceneList from "./list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getById } from "@/app/actions/scene-actions";

export default async function Scene({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["scenes"],
    queryFn: () => getById(params.id),
  });

  return (
    <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SceneList sceneId={params.id} />
      </HydrationBoundary>
    </div>
  );
}
