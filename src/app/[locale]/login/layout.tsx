import { Base } from "./layout.styles";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={Base()}>
      <section className={Base.Section()}>
        <div className={Base.Card()}>{children}</div>
      </section>
    </main>
  );
}
