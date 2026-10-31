import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export interface HeroRevealProps {
  assetKey: string;
  subLabel: string;
  headline: string;
}

export function HeroReveal({ assetKey, subLabel, headline }: HeroRevealProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden flex items-center bg-black isolate">
      <SmartImage
        assetKey={assetKey}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center absolute inset-0 z-0 brightness-[0.7]"
        alt={headline}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

      <Container className="relative z-20">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="inline-block text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#fe7900] mb-3">
            {subLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight drop-shadow-md">
            {headline}
          </h1>
        </div>
      </Container>
    </section>
  );
}
