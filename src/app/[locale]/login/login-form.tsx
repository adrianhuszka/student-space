"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const locale = useLocale();
  const translate = useTranslations("login-page");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);
    signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: true,
    }).then((result) => {
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError(result.error);
        } else {
          setError("submit-server-error");
        }
      }
    });
  }
  return (
    <>
      <form
        action="/api/auth/callback/credentials"
        onSubmit={onSubmit}
        method="post"
        className="flex flex-col gap-2"
      >
        <Input
          type="text"
          name="username"
          labelPlacement="inside"
          size="sm"
          label={translate("username")}
          required
        />
        <Input
          type="password"
          name="password"
          labelPlacement="inside"
          size="sm"
          label={translate("password")}
          required
        />
        <Checkbox defaultSelected size="sm">
          {translate("remember-me")}
        </Checkbox>
        <div className="text-red-900">
          {error && <p>{translate(error.toString())}</p>}
        </div>
        <Button aria-disabled={pending} type="submit">
          {translate("submit-btn")}
        </Button>
      </form>
      {/* <Button
        className="mt-3"
        onClick={() =>
          signIn("keycloak", {
            redirect: true,
          })
        }
      >
        Sign in with Keycloak
      </Button> */}
    </>
  );
}
