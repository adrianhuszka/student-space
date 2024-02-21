"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {
  const locale = useLocale();

  function onLogoutClick() {
    signOut();
  }

  return (
    <div>
      {session ? (
        <>
          <p>{session.user?.name}</p>
          <p>
            <Link href={locale + "/secret"}>secret</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            logout
          </button>
        </>
      ) : (
        <>
          <p>loggedOut</p>
          <Link href={locale + "/login"}>login</Link>
        </>
      )}
    </div>
  );
}
