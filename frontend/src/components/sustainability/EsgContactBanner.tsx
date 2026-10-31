import React from "react";
import { sustainabilityData } from "@/data/sustainability";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function EsgContactBanner() {
  const { contactBanner } = sustainabilityData;

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-neutral-900 text-white">
      <div className="absolute inset-0 z-0">
        <SmartImage
          assetKey={contactBanner.assetKey}
          fill
          className="object-cover object-center brightness-[0.65]"
          alt={contactBanner.heading}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
          {contactBanner.heading}
        </h2>
        <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed mb-8 max-w-xl mx-auto">
          {contactBanner.description}
        </p>

        <a
          href={`mailto:${contactBanner.email}`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#fe7900] text-white hover:bg-[#fe7900] transition-colors text-sm font-medium tracking-wide shadow-md"
        >
          Email ESG Team
        </a>
      </Container>
    </section>
  );
}
