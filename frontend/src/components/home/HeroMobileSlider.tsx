"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { homeData } from "@/data/home";

export function HeroMobileSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const { mobileSlideA } = homeData.hero;
  const totalSlides = 3;

  const goToSlide = useCallback((newIndex: number) => {
    setCurrentSlide((newIndex + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Autoplay timer: transitions on its own independently every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    if (e.touches.length > 0 && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0 && e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        nextSlide();
      } else if (diff < -45) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="block lg:hidden relative w-full h-[calc(100svh-72px)] sm:h-[calc(100svh-80px)] min-h-[500px] max-h-[760px] bg-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container with smooth CSS translateX */}
      <div
        className="relative w-full h-full flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
      >
        {/* ================= SLIDE 1: GATHERING GOODWILL FOREST ================= */}
        <div className="relative w-full h-full flex-shrink-0">
          <img
            src="/Images/Home/2nd.jpg"
            alt="Gathering goodwill for a better world"
            className="w-full h-full object-cover object-center brightness-105 pointer-events-none select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <div className="max-w-xs flex flex-col items-center gap-2">
              {mobileSlideA.lines.map((line, idx) => (
                <span
                  key={idx}
                  className="text-white text-lg sm:text-xl font-light tracking-widest uppercase drop-shadow-md"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SLIDE 2: 75 GW+ MILESTONE BANNER ================= */}
        <div className="relative w-full h-full flex-shrink-0 bg-[#7ba9d4]">
          <img
            src="/Images/Home/3.jpeg"
            alt="HIND POWER PROJECT 75 GW+ Bankability Banner"
            className="w-full h-full object-cover object-top pointer-events-none select-none"
            loading="eager"
          />
        </div>

        {/* ================= SLIDE 3: 4.JPEG SHOWCASE ================= */}
        <div className="relative w-full h-full flex-shrink-0 bg-[#111]">
          <img
            src="/Images/Home/4.jpeg"
            alt="HIND POWER PROJECT Clean Energy Showcase"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="eager"
          />
        </div>
      </div>

      {/* ================= PAGINATION PILLS / DOTS ================= */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xs">
        {[0, 1, 2].map((idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full h-2 ${
                isActive ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
