"use client";

import { useGetSceneById } from "@/data/get-scenes";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Note, TextBlock, TickSquare, TaskSquare, Folder } from "iconic-react";
import Link from "next/link";
import { useMemo } from "react";

export default function SceneList({ sceneId }: { sceneId: string }) {
  const { data, error, fetchStatus, refetch } = useGetSceneById(sceneId);

  const filteredData = useMemo(() => {
    if (!data || !data.items)
      return { news: [], forum: [], tests: [], tasks: [], documents: [] };

    return (
      data &&
      data.items &&
      data.items.reduce(
        (
          acc: {
            news: any[];
            forum: any[];
            tests: any[];
            tasks: any[];
            documents: any[];
          },
          item: { type: any }
        ) => {
          switch (item.type) {
            case "NEWS":
              acc.news.push(item);
              break;
            case "FORUM":
              acc.forum.push(item);
              break;
            case "TEST":
              acc.tests.push(item);
              break;
            case "TASK":
              acc.tasks.push(item);
              break;
            case "DOCUMENTS":
              acc.documents.push(item);
              break;
          }
          return acc;
        },
        { news: [], forum: [], tests: [], tasks: [], documents: [] } as any
      )
    );
  }, [data]);

  return (
    <Accordion
      selectionMode="multiple"
      isCompact={true}
      variant="splitted"
      defaultExpandedKeys={["1", "2", "3", "4", "5"]}
    >
      <AccordionItem
        key="1"
        aria-label="Hírek"
        title={
          <div className="flex flex-row w-full">
            <h1>Hírek</h1>
            <div className="flex-grow text-center">Utolsó üzenet</div>
            <h5>Dátum | &nbsp;</h5>
            <h5>Darab</h5>
          </div>
        }
        startContent={
          <Note size="32" fill="#979797" color="hsl(212 100% 47%)" />
        }
        hidden={filteredData.news.length === 0}
        className="p-2"
      >
        <Divider />
        {filteredData.news.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/news/${item.id}`}
          >
            &emsp; <Note size="32" fill="#979797" color="hsl(212 100% 47%)" />
            <h2>{item.name}</h2>
            <div className="flex-grow text-ellipsis">
              <p>{item.lastMessage}</p>
            </div>
            <h5>{item.lastUpdate} | </h5>
            <h5>{item.messageCount}</h5>
          </Button>
        ))}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Fórum"
        title={
          <div className="flex flex-row w-full">
            <h1>Fórum</h1>
            <div className="flex-grow text-center">Utolsó üzenet</div>
            <h5>Dátum | &nbsp;</h5>
            <h5>Darab</h5>
          </div>
        }
        startContent={
          <TextBlock size="32" fill="#979797" color="hsl(146 79% 44%)" />
        }
        hidden={filteredData.forum.length === 0}
        className="p-2"
      >
        <Divider />
        {filteredData.forum.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/forum/${item.id}`}
          >
            &emsp;
            <TextBlock size="32" fill="#979797" color="hsl(146 79% 44%)" />
            <h2>{item.name}</h2>
            <div className="flex-grow text-ellipsis pe-[8.5rem]">
              <p>{item.lastMessage}</p>
            </div>
            <h5>{item.lastUpdate} | </h5>
            <h5>{item.messageCount}</h5>
          </Button>
        ))}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Tesztek"
        title={
          <div className="flex flex-row w-full">
            <h1>Tesztek</h1>
            <div className="flex-grow text-center" />
            <h5>Határidő | &nbsp;</h5>
            <h5>Pontszám</h5>
          </div>
        }
        startContent={
          <TickSquare size="32" fill="#979797" color="hsl(339 90% 51%)" />
        }
        hidden={filteredData.tests.length === 0}
        className="p-2"
      >
        <Divider />
        {filteredData.tests.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/test/${item.id}`}
          >
            &emsp;
            <TickSquare size="32" fill="#979797" color="hsl(339 90% 51%)" />
            <h2>{item.name}</h2>
            <div className="flex-grow text-ellipsis">
              <p>{item.lastMessage}</p>
            </div>
            <h5>{item.deadline} | </h5>
            <h5>{item.points}</h5>
          </Button>
        ))}
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Feladatok"
        title={
          <div className="flex flex-row w-full">
            <h1>Feladatok</h1>
            <div className="flex-grow text-center" />
            <h5>Határidő | &nbsp;</h5>
            <h5>Pontszám</h5>
          </div>
        }
        startContent={
          <TaskSquare size="32" fill="#979797" color="hsl(37 91% 55%)" />
        }
        hidden={filteredData.tasks.length === 0}
        className="p-2"
      >
        <Divider />
        {filteredData.tasks.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/task/${item.id}`}
          >
            &emsp;
            <TaskSquare size="32" fill="#979797" color="hsl(37 91% 55%)" />
            <h2>{item.name}</h2>
            <div className="flex-grow text-ellipsis">
              <p>{item.lastMessage}</p>
            </div>
            <h5>{item.deadline} | </h5>
            <h5>{item.points}</h5>
          </Button>
        ))}
      </AccordionItem>
      <AccordionItem
        key="5"
        aria-label="Dokumentumok"
        title="Dokumentumok"
        startContent={
          <Folder size="32" fill="#979797" color="hsl(270 59% 58%)" />
        }
        hidden={filteredData.documents.length === 0}
        className="p-2"
      >
        {filteredData.documents.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center justify-start mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/document/${item.id}`}
          >
            &emsp;
            <Folder size="32" fill="#979797" color="hsl(270 59% 58%)" />
            {item.name}
          </Button>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
