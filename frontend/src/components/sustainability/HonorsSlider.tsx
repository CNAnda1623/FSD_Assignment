import React from "react";
import { sustainabilityData } from "@/data/sustainability";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function HonorsSlider() {
  const { honors } = sustainabilityData;

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-neutral-900 text-white">
      {/* Cover Background */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          assetKey={honors.bgAssetKey}
          fill
          className="object-cover object-center brightness-[0.55]"
          alt="Honors and Rewards Background"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container className="relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-white mb-14 tracking-tight drop-shadow-md">
          {honors.heading}
        </h2>

        {/* 4 Partner Honor Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {honors.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center justify-center p-3 sm:p-4 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
            >
              <div className="relative w-full h-full">
                <SmartImage
                  assetKey={item.logoAssetKey}
                  fill
                  className="object-contain object-center"
                  alt={item.name}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
