"use client";

import React, { useRef, useState, useEffect } from "react";
import { HeroMobileSlider } from "./HeroMobileSlider";

export function HeroSequence() {
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [progress, setProgress] = useState(0);

  // Desktop detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Coordinated scroll progress calculation on RAF
  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;
    let isTicking = false;

    const calculateProgress = () => {
      const el = imageTrackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const trackHeight = el.offsetHeight;
      const scrollable = trackHeight - windowHeight;

      if (scrollable <= 0) return;

      // Distance from top of sticky start to current scroll
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
      isTicking = false;
    };

    const handleScroll = () => {
      if (!isTicking) {
        rafId = requestAnimationFrame(calculateProgress);
        isTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  // Phase 1: Card Container Progressive Scaling (0.02 -> 0.22)
  let cardWidth = "100vw";
  let cardHeight = "calc(100vh - 85px)";
  let cardBorderRadius = "0px";

  if (progress <= 0.02) {
    cardWidth = "100vw";
    cardHeight = "calc(100vh - 85px)";
    cardBorderRadius = "0px";
  } else if (progress >= 0.22) {
    cardWidth = "80vw";
    cardHeight = "calc(100vh - 120px)";
    cardBorderRadius = "32px";
  } else {
    const t = (progress - 0.02) / (0.22 - 0.02);
    cardWidth = `${100 - t * 20}vw`;
    cardHeight = `calc(100vh - ${85 + t * 35}px)`;
    cardBorderRadius = `${t * 32}px`;
  }

  // Layer 2: Forest Parallax Y (0.22 -> 0.44)
  let forestParallaxY = 0;
  if (progress > 0.22 && progress < 0.44) {
    forestParallaxY = ((progress - 0.22) / 0.22) * -10;
  } else if (progress >= 0.44) {
    forestParallaxY = -10;
  }

  // Layer 3: 75 GW Milestone Banner (0.38 -> 0.58)
  let layer3Y = 100;
  if (progress <= 0.38) {
    layer3Y = 100;
  } else if (progress >= 0.58) {
    layer3Y = 0;
  } else {
    const t = (progress - 0.38) / (0.58 - 0.38);
    layer3Y = (1 - t) * 100;
  }

  // Layer 4: Additional Showcase (0.68 -> 0.88)
  let layer4Y = 100;
  if (progress <= 0.68) {
    layer4Y = 100;
  } else if (progress >= 0.88) {
    layer4Y = 0;
  } else {
    const t = (progress - 0.68) / (0.88 - 0.68);
    layer4Y = (1 - t) * 100;
  }

  return (
    <section className="relative w-full bg-white">
      {/* 1. Mobile & Tablet Homepage: Horizontal Image Sequence (<1024px) */}
      <HeroMobileSlider />

      {/* 2. Desktop Homepage: Separate Video and Scroll-Driven Image Sequence (>=1024px) */}
      <div className="hidden lg:block relative w-full bg-white">
        {/* ================= INITIAL DESKTOP VIDEO (100% Width, Natural Scroll) ================= */}
        {isDesktop && (
          <div className="relative w-full h-[calc(100vh-85px)] overflow-hidden bg-black">
            <video
              src="/Images/Home/first.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Subtle Scroll Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/80 animate-bounce pointer-events-none">
              <span className="text-[11px] uppercase tracking-widest font-light mb-1.5 drop-shadow">
                Scroll to explore
              </span>
              <svg
                className="w-5 h-5 text-white/80 drop-shadow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        )}

        {/* ================= SEPARATE IMAGE ANIMATION TRACK ================= */}
        <div
          ref={imageTrackRef}
          className="relative w-full h-[400vh] bg-white"
        >
          {/* Sticky Viewport pinned under navigation header (top 85px) */}
          <div className="sticky top-[85px] w-full h-[calc(100vh-85px)] overflow-hidden flex items-center justify-center bg-white">
            {/* Dynamically scaling and rounding media container */}
            <div
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: cardBorderRadius,
              }}
              className="relative max-w-[1680px] overflow-hidden bg-black shadow-none will-change-[width,height,border-radius]"
            >
              {/* ================= LAYER 2: 2ND.JPG (GATHERING GOODWILL - FIRST IMAGE) ================= */}
              <div
                style={{
                  transform: `translate3d(0, ${forestParallaxY}%, 0)`,
                }}
                className="absolute inset-0 w-full h-full overflow-hidden z-20 will-change-transform isolate"
              >
                <img
                  src="/Images/Home/2nd.jpg"
                  alt="Gathering goodwill for a better world"
                  className="w-full h-full object-cover object-center brightness-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Centered Typography overlay */}
                <div className="absolute inset-0 flex justify-center pt-[16vh] lg:pt-[20vh] px-4 pointer-events-none">
                  <h1 className="text-white text-2xl sm:text-3xl md:text-[36px] font-medium tracking-wide uppercase text-center whitespace-nowrap drop-shadow-md">
                    GATHERING GOODWILL FOR A BETTER WORLD
                  </h1>
                </div>
              </div>

              {/* ================= LAYER 3: 3.JPEG (75 GW+ MILESTONE BANNER) ================= */}
              <div
                style={{ transform: `translate3d(0, ${layer3Y}%, 0)` }}
                className="absolute inset-0 w-full h-full bg-[#7ba9d4] overflow-hidden z-30 will-change-transform"
              >
                <img
                  src="/Images/Home/3.jpeg"
                  alt="Sungrow 75 GW+ Bankability Banner"
                  className="w-full h-full object-cover object-top pointer-events-none select-none"
                  loading="eager"
                />
              </div>

              {/* ================= LAYER 4: 4.JPEG (ADDITIONAL SHOWCASE) ================= */}
              <div
                style={{ transform: `translate3d(0, ${layer4Y}%, 0)` }}
                className="absolute inset-0 w-full h-full bg-[#111] overflow-hidden z-40 will-change-transform"
              >
                <img
                  src="/Images/Home/4.jpeg"
                  alt="Sungrow Clean Energy Showcase"
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
