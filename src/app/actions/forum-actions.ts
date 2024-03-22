"use server";

import { getAccessToken } from "@/utils/sessionTokenAccessor";
import { revalidatePath } from "next/cache";

export async function getById({
    id
  }: {
    id: string
  }) {
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