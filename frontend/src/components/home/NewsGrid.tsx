import React from "react";
import { homeData } from "@/data/home";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { SmartImage } from "../ui/SmartImage";
import { Container } from "../ui/Container";

export function NewsGrid() {
  const { news } = homeData;

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa]">
      <Container>
        <SectionHeading title={news.heading} align="center" className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Featured Large Card (Left 6 or 7 cols) */}
          <a
            href={news.featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-6 xl:col-span-7 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] overflow-hidden">
              <SmartImage
                assetKey={news.featured.assetKey}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                alt={news.featured.title}
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#fe7900] mb-3">
                  {news.featured.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 group-hover:text-[#fe7900] transition-colors leading-snug">
                  {news.featured.title}
                </h3>
              </div>
              <span className="text-xs text-neutral-400 mt-6 font-light">
                {news.featured.date}
              </span>
            </div>
          </a>

          {/* 4 Small Cards Grid (Right 6 or 5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {news.items.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="relative w-full h-[150px] overflow-hidden">
                  <SmartImage
                    assetKey={item.assetKey}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#fe7900] mb-1.5">
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-medium text-neutral-800 line-clamp-2 group-hover:text-[#fe7900] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-neutral-400 mt-3 font-light">
                    {item.date}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center">
          <Button
            href={news.cta.href}
            isExternal={true}
            variant="outline-orange"
            size="md"
          >
            {news.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
