"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { brandStoryData } from "@/data/brandStory";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";
import { useNativeCarousel } from "@/hooks/useNativeCarousel";

export function MilestoneSlider() {
  const { containerRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useNativeCarousel({ step: 360 });

  const { milestones } = brandStoryData;

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-neutral-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          assetKey={milestones.bgAssetKey}
          fill
          className="object-cover object-center brightness-[0.55]"
          alt="Milestones of HIND POWER PROJECT"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <Container className="relative z-10 mb-8 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white">
          {milestones.heading}
        </h2>

        {/* Circular Arrows */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous milestone"
            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next milestone"
            className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Container>

      {/* Native Smooth Scroll Carousel Container */}
      <div
        ref={containerRef}
        className="w-full pl-4 sm:pl-6 lg:pl-8 overflow-x-auto select-none no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex gap-6 pr-8">
          {milestones.items.map((item, idx) => (
            <div
              key={idx}
              className="flex-[0_0_280px] sm:flex-[0_0_340px] md:flex-[0_0_380px] min-w-0 snap-start"
            >
              <div className="h-[220px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1 duration-200">
                <span className="text-2xl sm:text-3xl font-bold text-[#fe7900] tracking-tight">
                  {item.year}
                </span>
                <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
