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
    `${process.env.BACKEND_URL}/api/v1/administration/users?search=${search}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch groups");
  }

  const result = await response.json();
  return result;
}

export async function create(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const password2 = formData.get("password2") as string;
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const phone = formData.get("phone") as string;

  const token = await getAccessToken();

  if (password !== password2) {
    return {
      status: 400,
      errorMessage: "Passwords do not match!",
    };
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/administration/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        firstName: first_name,
        lastName: last_name,
        attributes: {
          phoneNumber: [phone],
          profile_picture: [""],
        },
      }),
    }
  );

  revalidatePath("/");

  return {
    status: response.status,
    errorMessage: await response.text(),
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
