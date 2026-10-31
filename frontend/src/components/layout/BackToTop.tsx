"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectScrollY } from "@/store/slices/uiSlice";

export function BackToTop() {
  const scrollY = useAppSelector(selectScrollY);
  const isVisible = scrollY > 300;

  if (!isVisible) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 sm:bottom-22 right-6 z-40 flex items-center justify-center rounded-full bg-white w-9 h-9 sm:w-10 sm:h-10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 text-[#fe7900] stroke-[2.5]" />
    </button>
  );
}
