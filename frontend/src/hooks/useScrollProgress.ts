"use client";

import { useState, useEffect, type RefObject } from "react";

export interface ScrollProgressOptions {
  /** Offset array [containerStart, containerEnd], default is ["start end", "end start"] */
  offset?: [string, string];
}

/**
 * High-performance, zero-dependency custom hook to calculate scroll progress
 * of a target container from 0 to 1 using requestAnimationFrame.
 */
export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  options?: ScrollProgressOptions
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let isTicking = false;

    const updateProgress = () => {
      const element = targetRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Default calculation: progress from when top of element enters viewport to when bottom leaves
      const elementHeight = rect.height;
      const totalScrollableDistance = elementHeight + windowHeight;
      const currentScroll = windowHeight - rect.top;

      let p = currentScroll / totalScrollableDistance;
      p = Math.max(0, Math.min(1, p));

      setProgress(p);
      isTicking = false;
    };

    const onScroll = () => {
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(updateProgress);
        isTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetRef, options]);

  return progress;
}

/**
 * Pure interpolation helper: maps a progress value from [inMin, inMax] to [outMin, outMax].
 */
export function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;

  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

