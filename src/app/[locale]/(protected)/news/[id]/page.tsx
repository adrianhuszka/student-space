export default function News({ params }: { params: { id: string } }) {
  return (
    <>
      <p>News</p>
      <div>Id: {params.id}</div>
    </>
  );
}
