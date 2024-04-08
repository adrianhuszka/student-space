export default function SceneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center py-8 md:py-10">
      <div className="inline-block text-center justify-center w-full">
        {children}
      </div>
    </section>
  );
}
