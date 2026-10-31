"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/cn";

export interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let isTicking = false;

    const calculateProgress = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when element enters lower part of screen (85% viewport)
      // Fully revealed when element reaches upper middle (45% viewport)
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.45;

      const current = startTrigger - rect.top;
      const total = startTrigger - endTrigger;

      const p = Math.max(0, Math.min(1, current / total));
      setProgress(p);
      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        rafId = requestAnimationFrame(calculateProgress);
        isTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={cn(
        "text-lg sm:text-xl md:text-2xl lg:text-[26px] font-light leading-relaxed max-w-4xl mx-auto text-center",
        className
      )}
    >
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;

        let wordProgress = 0;
        if (progress >= wordEnd) {
          wordProgress = 1;
        } else if (progress <= wordStart) {
          wordProgress = 0;
        } else {
          wordProgress = (progress - wordStart) / (wordEnd - wordStart);
        }

        const opacity = 0.25 + wordProgress * 0.75;
        // Interpolate between light gray (#a3a3a3) and dark text (#171717)
        const grayVal = Math.round(163 - wordProgress * (163 - 23));
        const color = `rgb(${grayVal}, ${grayVal}, ${grayVal})`;

        return (
          <span
            key={i}
            style={{ opacity, color }}
            className="inline-block mr-1.5 transition-colors duration-75"
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
