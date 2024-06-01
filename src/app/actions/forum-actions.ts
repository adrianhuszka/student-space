"use server";

import { getAccessToken } from "@/utils/sessionTokenAccessor";

export async function getById({ id }: { id: string }) {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/forum/get/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    console.error(await response.json());
    throw new Error("Failed to fetch forum with this id");
  }

  const result = await response.json();
  return result;
}

export async function getMessages({
  forumId,
  page,
  size,
  sort,
  direction,
}: {
  forumId: string;
  page: number;
  size: number;
  sort?: string;
  direction?: string;
}) {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/forum/messages?forumId=${forumId}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    console.error(await response.json());
    throw new Error("Failed to fetch messages for this forum");
  }

  const result = await response.json();
  return result;
}

export async function createMessage(formData: FormData) {
  const forumId = formData.get("forumId") as string;
  const message = formData.get("message") as string;
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/forum/messages`,
    {
      method: "POST",
      body: JSON.stringify({ forumId, message }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.status;
}
