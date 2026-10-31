"use client";

import React, { useState } from "react";
import { sustainabilityData } from "@/data/sustainability";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function StrategyTabs() {
  const { strategy } = sustainabilityData;
  const [activeTabId, setActiveTabId] = useState(strategy.tabs[0]?.id || "governance");

  const currentTab =
    strategy.tabs.find((t) => t.id === activeTabId) || strategy.tabs[0]!;

  return (
    <section id="strategy" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <Container>
        <SectionHeading title={strategy.heading} align="center" className="mb-10" />

        {/* Strategy Illustration Banner */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/7] sm:aspect-[21/9] md:aspect-[24/9] rounded-3xl overflow-hidden mb-14 shadow-sm bg-white flex items-center justify-center border border-neutral-100">
          <SmartImage
            assetKey={strategy.bannerAssetKey}
            fill
            className="object-contain object-center"
            alt="Sustainability Strategy Overview"
          />
        </div>

        {/* 5 Strategy Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-6 sm:gap-10 border-b border-neutral-200 pb-3 mb-10">
          {strategy.tabs.map((tab) => {
            const isActive = tab.id === currentTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`relative pb-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-[#fe7900] font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fe7900] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Tab Panel Display */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 text-white min-h-[500px] lg:min-h-[560px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Background Photo Crossfade */}
          {strategy.tabs.map((tab) => {
            const isActive = tab.id === currentTab.id;
            return (
              <div
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-500 z-0 ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <SmartImage
                  assetKey={tab.photoAssetKey}
                  fill
                  className="object-cover object-center brightness-[0.7]"
                  alt={tab.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
              </div>
            );
          })}

          {/* Top Panel Content: Title & CTAs */}
          <div className="max-w-xl z-10 pt-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-6 drop-shadow">
              {currentTab.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                href="https://www.sungrowpower.com/in/en/sustainability"
                isExternal={true}
                variant="solid-orange"
                size="sm"
              >
                Learn More About Our Actions
              </Button>
              <Button
                href="https://www.sungrowpower.com/in/en/sustainability"
                isExternal={true}
                variant="translucent-dark"
                size="sm"
              >
                All Strategies
              </Button>
            </div>
          </div>

          {/* Bottom 4-Stat Translucent Bar (2x2 on mobile, 4 in a row on desktop) */}
          <div className="mt-12 z-10 w-full rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTab.stats.map((st, sIdx) => (
              <div key={sIdx} className="flex flex-col">
                <span className="text-[11px] sm:text-xs text-neutral-300 font-light mb-1 line-clamp-2">
                  {st.label}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                  {st.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
