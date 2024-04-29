import SceneList from "./list";
import { Scene as SceneType } from "@/types";

export default function Scene({ scene }: { scene: SceneType }) {
  return (
    <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <SceneList sceneItems={scene.items} />
    </div>
  );
}
