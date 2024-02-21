export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto max-w-7xl flex flex-grow justify-center content-center">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
        <div className="inline-block max-w-lg text-center justify-center w-full border-1 p-5 rounded-2xl bg-black/50 shadow-glass backdrop-blur-md">
          {children}
        </div>
      </section>
    </main>
  );
}
