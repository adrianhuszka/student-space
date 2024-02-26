import { tv } from "@nextui-org/theme";

export const RootLayout = tv({
  base: "min-h-screen bg-background font-sans antialiased",
});

export const Overlay = tv({
  base: "scrollbar-thin relative flex flex-col h-screen overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300",
});

export const Loader = tv({
  base: "flex items-center justify-center flex-col w-full h-full",
});

export const Root = Object.assign(RootLayout, {
  Overlay,
  Loader,
});
