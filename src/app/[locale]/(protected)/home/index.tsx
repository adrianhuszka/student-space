"use client";

import CardElement from "./card-elements";
import { useListScenes } from "@/data/get-scenes";
import { ReactNode, useMemo } from "react";
import { getColorForType, Scene, SceneElement } from "@/types";
import { Folder, Note, TaskSquare, TextBlock, TickSquare } from "iconic-react";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "@/components/icons/plus";
import { useDisclosure } from "@nextui-org/modal";
import { AddNewSceneModal } from "./add-new-scene";

export const Home = () => {
  const { data, error, fetchStatus, refetch } = useListScenes();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const scenes: Scene[] = useMemo(() => {
    if (data) {
      console.log(data);
      return data;
    }
    return [
      {
        id: "1",
        name: "Programozás I",
        code: "Prog-I-inf3",
        description: "Programozás I. tárgy színtere",
        image: "/images/news.jpg",
        items: [
          {
            id: "1",
            name: "news",
            icon: <Note size="32" fill="#979797" />,
            color: "primary",
            unreadCount: 1,
          },
          {
            id: "2",
            name: "forum",
            icon: <TextBlock size="32" fill="#979797" />,
            color: "success",
            unreadCount: 0,
          },
          {
            id: "3",
            name: "test",
            icon: <TickSquare size="32" fill="#979797" />,
            color: "danger",
            unreadCount: 10,
          },
          {
            id: "55",
            name: "task",
            icon: <TaskSquare size="32" fill="#979797" />,
            color: "warning",
            unreadCount: 168,
          },
          {
            id: "4",
            name: "document",
            icon: <Folder size="32" fill="#979797" />,
            color: "secondary",
            unreadCount: 0,
          },
        ],
      },
    ];
  }, [data]);

  return (
    <>
      <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex p-4">
          <h3 className="text-xl font-semibold flex-grow">Színterek</h3>
          <Button onClick={onOpen} endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
        <div className="max-w-[60rem] mx-auto w-full px-1 md:px-0 flex flex-col flex-1 gap-3">
          {scenes.map((scene: Scene) => (
            <CardElement key={scene.id} {...scene} />
          ))}
        </div>
      </div>
      <AddNewSceneModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
