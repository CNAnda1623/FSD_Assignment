"use client";

import React, { useEffect, useState, useRef } from "react";

export interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isStatic?: boolean;
  staticText?: string;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  isStatic = false,
  staticText,
  className,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isStatic) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          );
          if (mediaQuery.matches) {
            setDisplayValue(value);
            return;
          }

          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic curve
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(easeProgress * value));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);
    return () => {
      observer.disconnect();
    };
  }, [value, duration, hasAnimated, isStatic]);

  if (isStatic && staticText) {
    return <span className={className}>{staticText}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {hasAnimated ? displayValue : 0}
      {suffix}
    </span>
  );
}
