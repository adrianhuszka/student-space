import { Base } from "../login/layout.styles";

export default function ForbiddenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={Base()}>
        <section className={Base.Section()}>
          <div className={Base.Card()}>{children}</div>
        </section>
      </main>
    </>
  );
}
