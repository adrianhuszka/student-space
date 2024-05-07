export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="flex gap-0 w-100 h-100">
    //   <section className="w-2/12 h-100">
    //     <Calendar />
    //   </section>
    <section className="flex flex-col items-center justify-center py-8 md:py-10">
      <div className="inline-block text-center justify-center w-full">
        {children}
      </div>
    </section>
    // </div>
  );
}
