export default function Forum({ params }: { params: { id: string } }) {
  return (
    <>
      <p>Fórum</p>
      <div>My Post: {params.id}</div>
    </>
  );
}
