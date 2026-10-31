import React from "react";
import { homeData } from "@/data/home";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function StackedPanels() {
  const { stackedPanels } = homeData;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading
          title={stackedPanels.heading}
          align="center"
          className="mb-14"
        />

        {/* Stacked Sticky Panels Container */}
        <div className="relative space-y-10 lg:space-y-12">
          {stackedPanels.panels.map((panel, idx) => (
            <div
              key={panel.id}
              className="sticky top-28 sm:top-36 rounded-3xl bg-white border border-neutral-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[420px] transition-shadow duration-300"
              style={{
                zIndex: idx + 1,
              }}
            >
              {/* Left Column (Text & Action) */}
              <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                      {panel.eyebrow}
                    </span>
                    <span className="text-[#fe7900] font-bold">--</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-800 leading-snug">
                    {panel.title}
                  </h3>
                </div>

                <div className="mt-8">
                  <Button
                    href={panel.href}
                    isExternal={!panel.isLocal}
                    variant="outline-orange"
                    size="md"
                  >
                    {panel.ctaLabel}
                  </Button>
                </div>
              </div>

              {/* Right Column (Image) */}
              <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full">
                <SmartImage
                  assetKey={panel.assetKey}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  alt={panel.title}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
