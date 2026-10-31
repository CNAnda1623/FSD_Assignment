"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Counter } from "../ui/Counter";
import { homeData } from "@/data/home";

export function ClientsWorldSection() {
  const { presence } = homeData;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#dfbc9c] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Extracted Text Content */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Eyebrow with Amber/Gold Accent Line */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-[3px] bg-[#efb932] rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/95">
                {presence.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-bold text-[#021637] leading-[1.18] tracking-tight mb-6">
              {presence.heading}
            </h2>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal mb-8">
              {presence.description}
            </p>

            {/* 160+ Stat Metric */}
            <div className="mb-8">
              <div className="text-5xl sm:text-6xl lg:text-[62px] font-extrabold text-[#021637] tracking-tight leading-none mb-2">
                <Counter value={presence.stat.value} suffix={presence.stat.suffix} />
              </div>
              <p className="text-sm sm:text-base text-white/95 font-normal leading-snug">
                Active projects across
                <br className="hidden sm:inline" /> India
              </p>
            </div>

            {/* Know More Button: Sharp Crisp Rectangle as in Image */}
            <div>
              <Link
                href={presence.cta.href}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#021637] font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase rounded-none shadow-sm hover:bg-neutral-100 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {presence.cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column: India Map (Second Image map.png) */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] lg:max-w-[620px] flex items-center justify-center">
              <Image
                src={presence.image.src}
                alt={presence.image.alt}
                width={presence.image.width}
                height={presence.image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 620px"
                className="w-full h-auto max-h-[620px] object-contain object-center select-none pointer-events-none drop-shadow-sm"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
