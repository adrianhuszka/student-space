"use server";

import { SignInResponse, signIn } from "next-auth/react";

export async function authenticate(
  prevState: SignInResponse | string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
  } catch (error) {
    if (error) {
      switch ((error as { type: string }).type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "submit-server-error";
      }
    }
    throw error;
  }
}
