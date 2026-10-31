"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-xl font-semibold text-neutral-800 mb-2">
        Something went wrong!
      </h2>
      <p className="text-sm text-neutral-600 mb-4 max-w-md">
        An error occurred while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#fe7900] text-white rounded font-medium hover:bg-[#e06b00] transition-colors text-sm"
      >
        Try again
      </button>
    </div>
  );
}

