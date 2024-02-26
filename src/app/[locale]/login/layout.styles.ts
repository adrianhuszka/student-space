import { tv } from "@nextui-org/theme";

export const BaseLayout = tv({
  base: "container mx-auto max-w-7xl flex flex-grow justify-center content-center",
});

export const LoginSection = tv({
  base: "flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full",
});

export const LoginCard = tv({
  base: "inline-block max-w-lg text-center justify-center w-full border-1 p-5 rounded-2xl bg-black/50 shadow-glass backdrop-blur-md",
});

export const LoginHeader = tv({
  base: "flex sm:flex-row mb-3 justify-between flex-col gap-2",
});

export const LoginTitle = tv({
  base: "text-2xl font-bold",
});

export const Base = Object.assign(BaseLayout, {
  Section: LoginSection,
  Card: LoginCard,
  Header: LoginHeader,
  Title: LoginTitle,
});
