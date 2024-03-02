"use server";

import { getAccessToken } from "@/utils/sessionTokenAccessor";

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

  return {
    status: response.status,
  };
}
