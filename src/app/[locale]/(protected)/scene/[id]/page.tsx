import { Accordion, AccordionItem } from "@nextui-org/accordion";
import SceneList from "./list";

export default function Scene({ params }: { params: { id: string } }) {
  const tmpData = {
    news: [
      {
        id: 1,
        title: "Hírek",
        lastUpdate: "2021.10.10",
        lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        messageCount: 3,
      },
    ],
    forum: [
      {
        id: 2,
        title: "Fórum",
        lastUpdate: "2021.10.10",
        lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        messageCount: 3,
      },
    ],
    tests: [
      {
        id: 3,
        title: "Teszt1",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
      {
        id: 4,
        title: "Teszt2",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
      {
        id: 5,
        title: "Teszt3",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
    ],
    tasks: [
      {
        id: 6,
        title: "Feladat1",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
      {
        id: 7,
        title: "Feladat2",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
      {
        id: 8,
        title: "Feladat3",
        deadline: "2021.10.10 12:00:00",
        points: 10,
      },
    ],
    documents: [
      {
        id: 9,
        title: "Anyagok",
        amount: 10,
      },
      {
        id: 10,
        title: "Segédanyagok",
        amount: 0,
      },
    ],
  };

  return (
    <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <SceneList data={tmpData} />
    </div>
  );
}
