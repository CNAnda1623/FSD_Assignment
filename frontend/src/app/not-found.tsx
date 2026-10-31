import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-white">
      <h1 className="text-6xl font-light text-neutral-800 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-neutral-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-neutral-500 max-w-md mb-8 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded text-sm font-medium border border-[#fe7900] text-[#fe7900] hover:bg-[#fe7900] hover:text-white transition-colors"
      >
        Return to Home
      </Link>
    </main>
  );
}
