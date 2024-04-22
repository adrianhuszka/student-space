"use client";

import React, { useMemo } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import NextLink from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/badge";
import { useRouter } from "next/navigation";
import { Scene } from "@/types";
import { Link } from "@nextui-org/link";

export default function CardElement({ ...props }: Scene) {
  const navigate = useRouter();

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
              color={item.color}
              content={item.unread}
              isInvisible={item.unread === 0}
              placement="bottom-right"
            >
              <Tooltip
                content={item.name}
                color={item.color}
                className="capitalize"
              >
                <Button
                  as={NextLink}
                  isIconOnly
                  color={item.color}
                  aria-label={item.name}
                  variant="light"
                  href={`/${item.name}/${item.id}`}
                >
                  {item.icon}
                </Button>
              </Tooltip>
            </Badge>
          ))}
      </CardFooter>
    </Card>
  );
}
