"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { homeData } from "@/data/home";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function ScenarioTabs() {
  const { scenarios } = homeData;
  const [activeTabId, setActiveTabId] = useState(scenarios.tabs[0]?.id || "for-home");

  const currentTab =
    scenarios.tabs.find((t) => t.id === activeTabId) || scenarios.tabs[0]!;

  return (
    <section className="relative w-full min-h-[680px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden bg-neutral-900 py-10 lg:py-14 text-white">
      {/* Background Crossfade Images */}
      {scenarios.tabs.map((tab) => {
        const isActive = tab.id === currentTab.id;
        return (
          <div
            key={tab.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out isolate ${
              isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
            }`}
          >
            <SmartImage
              assetKey={tab.bgAssetKey}
              fill
              sizes="100vw"
              className="object-cover object-center brightness-95"
              alt={tab.title}
            />
            {/* Soft left vignette to guarantee text legibility while keeping imagery vibrant */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
          </div>
        );
      })}

      {/* Top Centered Category Label */}
      <div className="relative z-10 text-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-8 text-sm sm:text-base tracking-wide drop-shadow">
          <span className="font-semibold text-white">Customer Scenarios</span>
          <span className="font-normal text-white/60">Business Areas</span>
        </div>
      </div>

      {/* Middle Left Content: Active Tab Title + Chevrons */}
      <Container className="relative z-10 py-10 lg:py-16">
        <div className="max-w-xl">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-white mb-8 sm:mb-10 flex items-center gap-2 drop-shadow">
            <span>{currentTab.title}</span>
            <span className="text-[#fe7900] text-3xl sm:text-4xl lg:text-5xl font-light leading-none select-none">
              &gt;
            </span>
          </h2>

          {/* Links with Orange Chevrons */}
          <div className="flex flex-col gap-4 sm:gap-5 max-w-fit">
            {currentTab.links.map((link, idx) => {
              const content = (
                <span className="inline-flex items-center gap-2.5 text-base sm:text-lg font-normal text-white/95 hover:text-[#fe7900] transition-colors group">
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#fe7900] group-hover:translate-x-1 transition-transform" />
                </span>
              );

              return link.isLocal ? (
                <Link key={idx} href={link.href}>
                  {content}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Bottom Floating Pill Dock Tab Bar */}
      <div className="relative z-10 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-6xl mx-auto">
          <div
            role="tablist"
            aria-label="Customer Scenarios and Business Areas"
            className="w-full bg-[#52585e]/80 backdrop-blur-md rounded-2xl p-1.5 sm:p-2 flex items-center justify-between border border-white/10 shadow-2xl overflow-x-auto no-scrollbar gap-1 sm:gap-2"
          >
            {scenarios.tabs.map((tab, idx) => {
              const isActive = tab.id === currentTab.id;
              return (
                <React.Fragment key={tab.id}>
                  {idx > 0 && (
                    <span className="text-white/20 select-none hidden lg:inline px-1">
                      |
                    </span>
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveTabId(tab.id)}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`flex-1 min-w-[120px] sm:min-w-[140px] py-3 sm:py-3.5 px-3 sm:px-6 rounded-xl transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap cursor-pointer text-center ${
                      isActive
                        ? "bg-white text-neutral-900 font-semibold shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10 font-normal"
                    }`}
                  >
                    {tab.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
