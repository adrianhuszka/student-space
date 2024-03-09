export default function Task({ params }: { params: { id: string } }) {
  return (
    <>
      <p>Fórum</p>
      <div>My Post: {params.id}</div>
    </>
  );
}
