"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export interface SelectorRow {
  id: string;
  label: string;
  thumbAssetKey: string;
  mainAssetKey: string;
  description?: string;
}

export interface HowItWorksProps {
  title?: string;
  description?: string;
  rows: readonly [SelectorRow, SelectorRow] | [SelectorRow, SelectorRow];
}

export function HowItWorks({
  title = "How Does It Work?",
  description = "A complete system to power your property with clean, reliable energy.",
  rows,
}: HowItWorksProps) {
  const [activeRowId, setActiveRowId] = useState<string>(rows[0].id);

  const activeRow = rows.find((r) => r.id === activeRowId) || rows[0];

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa]">
      <Container>
        <SectionHeading
          title={title}
          description={description}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Dynamic System Illustration (Swaps with selection) */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-md bg-white border border-neutral-100">
            {rows.map((row) => {
              const isSelected = row.id === activeRow.id;
              return (
                <div
                  key={row.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <SmartImage
                    assetKey={row.mainAssetKey}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                    alt={row.label}
                  />
                </div>
              );
            })}
          </div>

          {/* Right: Selectable Selector Cards */}
          <div
            role="tablist"
            aria-label="System components"
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {rows.map((row) => {
              const isSelected = row.id === activeRow.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveRowId(row.id)}
                  className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#fe7900] shadow-md ring-1 ring-[#fe7900]"
                      : "bg-white border-neutral-200 hover:border-neutral-300 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center p-2 flex-shrink-0">
                      <SmartImage
                        assetKey={row.thumbAssetKey}
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain"
                        alt={row.label}
                      />
                    </div>

                    <div>
                      <h4
                        className={`text-base font-semibold transition-colors ${
                          isSelected ? "text-[#fe7900]" : "text-neutral-900"
                        }`}
                      >
                        {row.label}
                      </h4>
                      {row.description && (
                        <p className="text-xs text-neutral-500 font-light mt-0.5">
                          {row.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected
                        ? "text-[#fe7900] translate-x-1"
                        : "text-neutral-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
