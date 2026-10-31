import React from "react";
import { sustainabilityData } from "@/data/sustainability";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function ClimateTargets() {
  const { targets } = sustainabilityData;

  return (
    <section id="overview" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <Container>
        <SectionHeading title={targets.heading} align="center" className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {targets.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-orange-50/60 flex items-center justify-center mb-6">
                <SmartImage
                  assetKey={item.iconAssetKey}
                  width={56}
                  height={56}
                  className="w-10 h-10 object-contain text-[#fe7900]"
                  alt={item.title}
                />
              </div>

              <h3 className="text-base sm:text-lg font-medium text-neutral-900 leading-snug mb-4">
                {item.title}
              </h3>

              <div className="mt-auto pt-3 border-t border-neutral-100 w-full text-xs font-semibold uppercase tracking-wider text-[#fe7900]">
                {item.timeline}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 font-light">
          {targets.note}
        </p>
      </Container>
    </section>
  );
}
