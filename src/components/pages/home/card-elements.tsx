"use client";

import React, { useMemo } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
  Folder,
  Icon,
  Link,
  Note,
  TaskSquare,
  TextBlock,
  TickSquare,
} from "iconic-react";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { useRouter } from "next/navigation";
import { useGetGroups } from "@/data/get-user-groups";

export default function CardElement() {
  const navigate = useRouter();

  const { data, error, fetchStatus, refetch } = useGetGroups();

  const groups = useMemo(() => {
    if (data?.length > 0) {
      console.log(data);
      return data;
    }
    return [];
  }, [data]);

  if(groups.length === 0) {
    return (
      <>
        Could not fetch any data
      </>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{groups.name}</p>
          <p className="text-small text-default-500">Prog-I-inf3</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex items-center">
        <p>{groups.description}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end flex-wrap pe-10 gap-2">
        <Badge color="primary" content={groups.news.unread} placement="bottom-right">
          <Tooltip content="News" color="primary" className="capitalize">
            <Button
              isIconOnly
              color="primary"
              aria-label="News"
              variant="light"
              onClick={() => navigate.push("/news/2389479-827364872")}
            >
              <Note size="32" fill="#979797" />
            </Button>
          </Tooltip>
        </Badge>
        <Badge color="success" content="1" placement="bottom-right">
          <Tooltip content="Forum" color="success" className="capitalize">
            <Button
              isIconOnly
              color="success"
              aria-label="Forum"
              variant="light"
              onClick={() => navigate.push("/forum/2389479-827364872")}
            >
              <TextBlock size="32" fill="#979797" />
            </Button>
          </Tooltip>
        </Badge>
        <Badge color="danger" content="1" placement="bottom-right">
          <Tooltip content="Tests" color="danger" className="capitalize">
            <Button
              isIconOnly
              color="danger"
              aria-label="Tests"
              variant="light"
              onClick={() => navigate.push("/test/2389479-827364872")}
            >
              <TickSquare size="32" fill="#979797" />
            </Button>
          </Tooltip>
        </Badge>
        <Badge color="danger" content="1" placement="bottom-right">
          <Tooltip content="Tasks" color="danger" className="capitalize">
            <Button
              isIconOnly
              color="danger"
              aria-label="Tasks"
              variant="light"
              onClick={() => navigate.push("/task/2389479-827364872")}
            >
              <TaskSquare size="32" fill="#979797" />
            </Button>
          </Tooltip>
        </Badge>
        <Badge color="secondary" content="1" placement="bottom-right">
          <Tooltip content="Folder" color="secondary" className="capitalize">
            <Button
              isIconOnly
              color="secondary"
              aria-label="Folder"
              variant="light"
            >
              <Folder size="32" fill="#979797" />
            </Button>
          </Tooltip>
        </Badge>
      </CardFooter>
    </Card>
  );
}
