"use client";

import React from "react";
import { homeData } from "@/data/home";
import { ScrollRevealText } from "../ui/ScrollRevealText";
import { Counter } from "../ui/Counter";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function CleanPowerIntro() {
  const { cleanPower } = homeData;

  return (
    <section className="pt-8 pb-16 lg:pb-20 bg-white">
      <Container>
        {/* Section Heading: sentence case, ≈ 36 px, medium weight, colour #F27104 */}
        <h2 className="text-[32px] sm:text-[36px] font-medium text-[#fe7900] text-center mb-8 tracking-tight">
          Clean Power for All
        </h2>

        {/* Scroll-linked Color Reveal Paragraph: weight 400, ≈ 20 px, centred, dark grey */}
        <ScrollRevealText
          text={cleanPower.description}
          className="text-[18px] sm:text-[20px] font-normal text-neutral-800 leading-relaxed max-w-4xl mx-auto text-center mb-16"
        />

        {/* 5 Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 pt-6 pb-10 border-b border-neutral-100">
          {cleanPower.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-neutral-50/70 transition-colors"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <SmartImage
                  assetKey={stat.iconAsset}
                  src={stat.src}
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain text-[#fe7900]"
                  alt={stat.label}
                />
              </div>

              <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  isStatic={stat.isStatic}
                  staticText={stat.staticText}
                />
              </div>

              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-snug max-w-[180px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Footnotes */}
        <div className="mt-6 text-[11px] text-neutral-400 font-light space-y-1 text-center">
          {cleanPower.footnotes.map((fn, i) => (
            <p key={i}>{fn}</p>
          ))}
        </div>

        {/* Centered CTA Button and Orange Vertical Accent Line */}
        <div className="mt-12 flex flex-col items-center">
          <Button
            href={cleanPower.cta.href}
            variant="outline-orange"
            size="md"
            className="rounded-full px-8 py-2.5 font-medium"
          >
            {cleanPower.cta.label}
          </Button>
          <div className="w-0.5 h-12 bg-[#fe7900] mt-8" />
        </div>
      </Container>
    </section>
  );
}
