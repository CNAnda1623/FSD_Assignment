"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface NativeCarouselOptions {
  /** Approximate slide width or step in pixels for scrollBy. If undefined, uses container offsetWidth */
  step?: number;
  /** Autoplay interval in milliseconds. If 0 or undefined, autoplay is disabled */
  autoplayInterval?: number;
}

/**
 * Reusable zero-dependency hook for responsive smooth carousels.
 * Replaces Embla Carousel with native CSS scroll-snap & scrollBy.
 */
export function useNativeCarousel(options?: NativeCarouselOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 5);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 5);

    // Calculate approximate active slide index
    const step = options?.step || clientWidth;
    if (step > 0) {
      const idx = Math.round(scrollLeft / step);
      setCurrentIndex(idx);
    }
  }, [options?.step]);

  const scrollPrev = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const step = options?.step || el.clientWidth * 0.85;
    el.scrollBy({ left: -step, behavior: "smooth" });
  }, [options?.step]);

  const scrollNext = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const step = options?.step || el.clientWidth * 0.85;
    el.scrollBy({ left: step, behavior: "smooth" });
  }, [options?.step]);

  const scrollTo = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const step = options?.step || el.clientWidth;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  }, [options?.step]);

  // Scroll listener to update arrow enabled states
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability, { passive: true });

    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [checkScrollability]);

  // Optional autoplay
  useEffect(() => {
    if (!options?.autoplayInterval || options.autoplayInterval <= 0 || isPaused) return;

    const timer = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollNext();
      }
    }, options.autoplayInterval);

    return () => clearInterval(timer);
  }, [options?.autoplayInterval, isPaused, scrollNext]);

  return {
    containerRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    canScrollPrev,
    canScrollNext,
    currentIndex,
    setIsPaused,
  };
}

