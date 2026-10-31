import React from "react";
import { sustainabilityData } from "@/data/sustainability";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function NewsCards() {
  const { news } = sustainabilityData;

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5]">
      <Container>
        <SectionHeading title={news.heading} align="center" className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative w-full h-[220px] overflow-hidden">
                <SmartImage
                  assetKey={item.assetKey}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  alt={item.title}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#fe7900] mb-3">
                    {item.tag}
                  </span>
                  <h4 className="text-base font-medium text-neutral-900 group-hover:text-[#fe7900] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
