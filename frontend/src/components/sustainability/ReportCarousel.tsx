"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { sustainabilityData } from "@/data/sustainability";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";
import { useNativeCarousel } from "@/hooks/useNativeCarousel";

export function ReportCarousel() {
  const [activeTab, setActiveTab] = useState<"reports" | "policies">("reports");
  const { containerRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useNativeCarousel({ step: 420 });

  const { reports } = sustainabilityData;

  const currentItems =
    activeTab === "policies" ? reports.policyItems : reports.reportItems;

  return (
    <section id="reports" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeading title={reports.heading} align="center" className="mb-8" />

        {/* 2 Sub-Tabs */}
        <div className="flex items-center justify-center gap-8 border-b border-neutral-100 pb-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`relative pb-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
              activeTab === "reports"
                ? "text-[#fe7900] font-semibold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sustainability Report
            {activeTab === "reports" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fe7900] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("policies")}
            className={`relative pb-2 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
              activeTab === "policies"
                ? "text-[#fe7900] font-semibold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Sustainability Policy
            {activeTab === "policies" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fe7900] rounded-full" />
            )}
          </button>
        </div>

        {/* Carousel Container with Prev / Next Arrows */}
        <div className="relative bg-[#f8f8f8] rounded-3xl p-6 sm:p-10 border border-neutral-100 mb-12">
          <div
            ref={containerRef}
            className="overflow-x-auto select-none no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            <div className="flex gap-8">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 snap-start"
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    {/* Report Cover (Shadowed) */}
                    <div className="w-[180px] sm:w-[200px] h-[240px] sm:h-[260px] relative rounded-lg overflow-hidden shadow-md flex-shrink-0">
                      <SmartImage
                        assetKey={item.assetKey}
                        fill
                        className="object-cover object-center"
                        alt={item.title}
                      />
                    </div>

                    {/* Metadata & Download Button */}
                    <div className="flex flex-col justify-between flex-1 text-center sm:text-left h-full">
                      <div>
                        <span className="text-xs uppercase font-semibold tracking-wider text-[#fe7900] mb-2 block">
                          {item.eyebrow}
                        </span>
                        <h4 className="text-base sm:text-lg font-medium text-neutral-900 uppercase leading-snug mb-6">
                          {item.title}
                        </h4>
                      </div>

                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#fe7900] hover:bg-[#e56d00] transition-colors shadow-xs w-fit mx-auto sm:mx-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download ↓</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Arrows */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous report"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#fe7900] transition-colors cursor-pointer z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next report"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#fe7900] transition-colors cursor-pointer z-10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Explore More CTA */}
        <div className="flex justify-center">
          <Button
            href={reports.cta.href}
            isExternal={true}
            variant="outline-orange"
            size="md"
          >
            {reports.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
