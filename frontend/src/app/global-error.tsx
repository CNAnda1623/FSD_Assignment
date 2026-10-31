"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-neutral-800 bg-white">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-semibold">Something went wrong!</h2>
          <p className="text-sm text-neutral-600">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#fe7900] text-white rounded font-medium hover:bg-[#e06b00] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
