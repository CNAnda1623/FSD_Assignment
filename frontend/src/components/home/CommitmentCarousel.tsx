"use client";

import React from "react";
import { homeData } from "@/data/home";
import { ScrollRevealText } from "../ui/ScrollRevealText";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function CommitmentCarousel() {
  const { whySungrow, commitment } = homeData;

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5] overflow-hidden">
      <Container>
        {/* Vertical Orange Accent Line */}
        <div className="w-0.5 h-12 bg-[#fe7900] mx-auto mb-6" />

        {/* Why Sungrow Section Heading in Brand Orange */}
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-medium text-[#fe7900] text-center mb-6 tracking-tight">
          {whySungrow.heading}
        </h2>

        {/* Scroll Reveal Text */}
        <ScrollRevealText
          text={whySungrow.description}
          className="text-lg sm:text-xl font-normal text-neutral-800 leading-relaxed max-w-4xl mx-auto text-center mb-8"
        />

        {/* Vertical Orange Accent Line */}
        <div className="w-0.5 h-12 bg-[#fe7900] mx-auto mb-10" />

        {/* Commitment to Innovation Heading Centered */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-light text-neutral-900 tracking-tight">
            {commitment.heading}
          </h2>
        </div>
      </Container>

      {/* Horizontal Cards Scroller */}
      <div className="w-full pl-4 sm:pl-6 lg:pl-12 overflow-x-auto pb-6 no-scrollbar">
        <div className="flex gap-6 min-w-max pr-8 sm:pr-12">
          {commitment.cards.map((card) => (
            <div
              key={card.id}
              className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[440px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-start p-8 text-white transition-all duration-300 hover:-translate-y-1.5 isolate"
            >
              <SmartImage
                assetKey={card.assetKey}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                className="object-cover object-center absolute inset-0 z-0 brightness-[0.7] group-hover:scale-105 transition-transform duration-500"
                alt={card.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10 pointer-events-none" />

              {/* Title & Button Grouped at Top of Card */}
              <div className="relative z-20 space-y-5">
                <h3 className="text-xl sm:text-2xl font-normal leading-snug drop-shadow max-w-[260px]">
                  {card.title}
                </h3>

                <div>
                  <Button
                    href={card.href}
                    isExternal={true}
                    variant="solid-orange"
                    size="sm"
                    className="font-medium px-5 py-2 shadow-sm rounded-full"
                  >
                    Explore More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
