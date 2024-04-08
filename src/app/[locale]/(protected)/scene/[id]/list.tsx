"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Note, TextBlock, TickSquare, TaskSquare, Folder } from "iconic-react";
import Link from "next/link";

export default function SceneList({ data }: { data: any }) {
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
        className="p-2"
      >
        <Divider />
        {data.news.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/news/${item.id}`}
          >
            &emsp; <Note size="32" fill="#979797" color="hsl(212 100% 47%)" />
            <h2>{item.title}</h2>
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
        className="p-2"
      >
        <Divider />
        {data.forum.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/forum/${item.id}`}
          >
            &emsp;
            <TextBlock size="32" fill="#979797" color="hsl(146 79% 44%)" />
            <h2>{item.title}</h2>
            <div className="flex-grow text-ellipsis">
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
        className="p-2"
      >
        <Divider />
        {data.tests.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/test/${item.id}`}
          >
            &emsp;
            <TickSquare size="32" fill="#979797" color="hsl(339 90% 51%)" />
            <h2>{item.title}</h2>
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
        className="p-2"
      >
        <Divider />
        {data.tasks.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/task/${item.id}`}
          >
            &emsp;
            <TaskSquare size="32" fill="#979797" color="hsl(37 91% 55%)" />
            <h2>{item.title}</h2>
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
        className="p-2"
      >
        {data.documents.map((item: any) => (
          <Button
            key={item.id}
            className="flex flex-row gap-2 items-center justify-start mt-2 w-full"
            variant="ghost"
            as={Link}
            href={`/document/${item.id}`}
          >
            &emsp;
            <Folder size="32" fill="#979797" color="hsl(270 59% 58%)" />
            {item.title}
          </Button>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
