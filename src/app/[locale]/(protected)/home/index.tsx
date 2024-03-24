"use client";

import CardElement from "./card-elements";
import { useGetScenes } from "@/data/get-user-scenes";
import { useMemo } from "react";
import { Scene } from "@/types";
import { Folder, Note, TaskSquare, TextBlock, TickSquare } from "iconic-react";

export const Home = () => {
  const { data, error, fetchStatus, refetch } = useGetScenes();

  const scenes: Scene[] = useMemo(() => {
    if (data && data.length > 0) {
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
            unread: 1,
          },
          {
            id: "2",
            name: "forum",
            icon: <TextBlock size="32" fill="#979797" />,
            color: "success",
            unread: 0,
          },
          {
            id: "3",
            name: "test",
            icon: <TickSquare size="32" fill="#979797" />,
            color: "danger",
            unread: 10,
          },
          {
            id: "55",
            name: "task",
            icon: <TaskSquare size="32" fill="#979797" />,
            color: "warning",
            unread: 168,
          },
          {
            id: "4",
            name: "document",
            icon: <Folder size="32" fill="#979797" />,
            color: "secondary",
            unread: 0,
          },
        ],
      },
    ];
  }, [data]);

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Színterek</h3>
      <div className="max-w-[60rem] mx-auto w-full px-1 md:px-0 flex flex-col flex-1 gap-3">
        {scenes.map((scene: Scene) => (
          <CardElement key={scene.id} {...scene} />
        ))}
      </div>
    </div>
  );
};
