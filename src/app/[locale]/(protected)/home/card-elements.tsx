"use client";

import React, { ReactNode, useMemo } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import NextLink from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { useRouter } from "next/navigation";
import { getColorForType, Scene, SceneElement } from "@/types";
import { Link } from "@nextui-org/link";
import { Note, TextBlock, TickSquare, TaskSquare, Folder } from "iconic-react";

export default function CardElement({ ...props }: Scene) {
  const navigate = useRouter();

  const getIconForType = (type: SceneElement["type"]): ReactNode | null => {
    switch (type) {
      case "NEWS":
        return <Note size="32" fill="#979797" />;
      case "FORUM":
        return <TextBlock size="32" fill="#979797" />;
      case "TEST":
        return <TickSquare size="32" fill="#979797" />;
      case "TASK":
        return <TaskSquare size="32" fill="#979797" />;
      case "DOCUMENTS":
        return <Folder size="32" fill="#979797" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3" as={Link} href={`/scene/${props.id}`}>
        <div className="flex flex-col">
          <p className="text-md text-white">{props.name}</p>
          <p className="text-small text-default-500">{props.code}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex items-center">
        <p>{props.description}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end flex-wrap pe-10 gap-2">
        {props.items &&
          props.items.map((item) => (
            <Badge
              key={item.id}
              color={getColorForType(item.type)}
              content={item.unreadCount}
              isInvisible={
                item.unreadCount === null ||
                item.unreadCount === undefined ||
                item.unreadCount === 0
              }
              placement="bottom-right"
            >
              <Tooltip
                content={item.name}
                color={getColorForType(item.type)}
                className="capitalize"
              >
                <Button
                  as={NextLink}
                  isIconOnly
                  color={getColorForType(item.type)}
                  aria-label={item.name}
                  variant="light"
                  href={`/${item.name}/${item.id}`}
                >
                  {getIconForType(item.type)}
                </Button>
              </Tooltip>
            </Badge>
          ))}
      </CardFooter>
    </Card>
  );
}
