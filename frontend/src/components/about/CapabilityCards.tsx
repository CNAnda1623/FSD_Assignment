"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { brandStoryData } from "@/data/brandStory";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function CapabilityCards() {
  const [expandedId, setExpandedId] = useState<string | null>("r-and-d");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { capabilities } = brandStoryData;

  return (
    <section className="py-16 lg:py-24 bg-[#f5f5f5]">
      <Container>
        {/* DESKTOP VIEW (>=768px): 5 Cards in a Row with Hover Expand */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-6 items-start min-h-[380px]">
          {capabilities.map((cap) => {
            const isHovered = hoveredId === cap.id;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setHoveredId(cap.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center justify-between transition-all duration-300 ease-out cursor-pointer ${
                  isHovered
                    ? "h-[420px] shadow-xl -translate-y-2 z-10"
                    : "h-[320px] shadow-xs"
                }`}
              >
                {/* Top: Icon + Label */}
                <div className="flex flex-col items-center text-center w-full mt-4">
                  <div
                    className={`w-14 h-14 mb-4 flex items-center justify-center transition-transform duration-300 ${
                      isHovered ? "scale-115" : "scale-100"
                    }`}
                  >
                    <SmartImage
                      assetKey={cap.iconAssetKey}
                      width={56}
                      height={56}
                      className="w-12 h-12 object-contain text-[#fe7900]"
                      alt={cap.name}
                    />
                  </div>
                  <h3 className="text-base lg:text-lg font-medium text-neutral-900 tracking-tight">
                    {cap.name}
                  </h3>
                </div>

                {/* Expanded Link List on Hover */}
                {isHovered && (
                  <div className="w-full my-auto pt-3 border-t border-neutral-100 animate-in fade-in duration-200">
                    <ul className="space-y-1.5 text-center">
                      {cap.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-600 hover:text-[#fe7900] transition-colors block py-0.5"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom: Circular Plus Indicator */}
                <div className="mt-auto pt-4">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                      isHovered
                        ? "border-[#fe7900] text-[#fe7900] bg-orange-50/50"
                        : "border-neutral-200 text-neutral-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW (<768px): Vertical Stack of Full-Width Rows Matching Spec §8.2 */}
        <div className="md:hidden space-y-3">
          {capabilities.map((cap) => {
            const isExpanded = expandedId === cap.id;

            return (
              <div
                key={cap.id}
                className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden transition-all duration-300"
              >
                {/* Collapsed Row Header */}
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === cap.id ? null : cap.id)}
                  className="w-full h-18 px-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900]"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <SmartImage
                        assetKey={cap.iconAssetKey}
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                        alt={cap.name}
                      />
                    </div>
                    <span className="text-base font-medium text-neutral-900">
                      {cap.name}
                    </span>
                  </div>

                  {/* Circular +/- Action Icon */}
                  <div className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 text-[#fe7900]" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Accordion Links */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-neutral-100 bg-neutral-50/50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <ul className="space-y-2">
                      {cap.links.map((link, lIdx) => (
                        <li key={lIdx}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-700 hover:text-[#fe7900] block py-1"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
