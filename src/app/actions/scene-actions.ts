"use server";

import { Scene } from "@/types";
import { getAccessToken } from "@/utils/sessionTokenAccessor";

export async function list() {
  const token = await getAccessToken();

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/scenes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch scenes");
  }

  const result = await response.json();
  return result;
}

export async function create(prevState: any, formData: FormData) {
  const token = await getAccessToken();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/scenes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      description: description,
    }),
  });

  return { status: response.status };
}
