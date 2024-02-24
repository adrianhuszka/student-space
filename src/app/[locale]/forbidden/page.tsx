import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>403 - Forbidden</h2>
      <p>Access to the requested resource is forbidden</p>
      <Link href="/" className="underline">
        {"<- "} Return Home
      </Link>
    </div>
  );
}
