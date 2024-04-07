import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-lg text-gray-600 mb-4">
        Could not find the requested resource
      </p>
      <Link href="/" className=" hover:underline">
        Return Home
      </Link>
    </div>
  );
}
