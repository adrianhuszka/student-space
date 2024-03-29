"use server";

import { getAccessToken } from "@/utils/sessionTokenAccessor";
import { revalidatePath } from "next/cache";

export async function list({
  search = "",
  page = 0,
  size = 10,
}: {
  search?: string;
  page?: number;
  size?: number;
}) {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/groups?search=${search}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    console.error(await response.json());
    throw new Error("Failed to fetch groups");
  }

  const result = await response.json();
  return result;
}

export async function create(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const parentGroup = formData.get("parentGroup") as string;
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/groups`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        parentId: parentGroup,
      }),
    }
  );

  revalidatePath("/");

  return {
    status: response.status,
  };
}

export async function remove(groupId: string) {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/groups/${groupId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/");

  return {
    status: response.status,
  };
}
