"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { LoginFormS } from "./form.styles";

export default function LoginForm({ username }: { username: string }) {
  const { pending } = useFormStatus();
  const translate = useTranslations("login-page");
  const searchParams = useSearchParams();

  const urlError = searchParams.get("error");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      rememberMe: formData.get("remember-me") !== null,
      redirect: true,
    });
  }
  return (
    <>
      <form
        action="/api/auth/callback/credentials"
        onSubmit={onSubmit}
        method="post"
        className={LoginFormS()}
      >
        <Input
          type="text"
          name="username"
          labelPlacement="inside"
          size="sm"
          label={translate("username")}
          defaultValue={username}
          required
          autoFocus
        />
        <Input
          type="password"
          name="password"
          labelPlacement="inside"
          size="sm"
          label={translate("password")}
          required
        />
        <Checkbox name="remember-me" size="sm" defaultSelected={!!username}>
          {translate("remember-me")}
        </Checkbox>
        <div className={LoginFormS.ErrorText()}>
          {urlError && urlError !== "" && <p>{translate(urlError)}</p>}
        </div>
        <Button aria-disabled={pending} type="submit">
          {translate("submit-btn")}
        </Button>
      </form>
    </>
  );
}
