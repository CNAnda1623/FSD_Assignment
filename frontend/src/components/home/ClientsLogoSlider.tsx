"use client";

import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";

// Generated B2B client company logos (realistic clean energy & commercial infrastructure clients)
const clientLogos = [
  { name: "Solara Dynamics", src: "/Images/clients/client_solara.svg" },
  { name: "NexVolt Power Grid", src: "/Images/clients/client_nexvolt.svg" },
  { name: "Apex Grid Solutions", src: "/Images/clients/client_apexgrid.svg" },
  { name: "Helios Commercial", src: "/Images/clients/client_helios.svg" },
  { name: "Aura Energy Group", src: "/Images/clients/client_aura.svg" },
  { name: "Vanguard CleanPower", src: "/Images/clients/client_vanguard.svg" },
  { name: "TerraWatt Infrastructure", src: "/Images/clients/client_terrawatt.svg" },
  { name: "Lumina Industries", src: "/Images/clients/client_lumina.svg" },
  { name: "EcoVolt Engineering", src: "/Images/clients/client_ecovolt.svg" },
  { name: "Stratum Power", src: "/Images/clients/client_stratum.svg" },
  { name: "VoltEdge Systems", src: "/Images/clients/client_voltedge.svg" },
  { name: "Blue Horizon Renewables", src: "/Images/clients/client_bluehorizon.svg" },
];

export function ClientsLogoSlider() {
  // Duplicated list to create a seamless infinite right-to-left marquee
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fafafa] border-t border-neutral-100/60 overflow-hidden select-none">
      {/* Embedded CSS guarantee: single flat plane right-to-left translation with pause-on-hover */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes clientsPlaneScrollRightToLeft {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .clients-scroll-plane {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: nowrap !important;
              align-items: center !important;
              width: max-content !important;
              will-change: transform;
              animation: clientsPlaneScrollRightToLeft 28s linear infinite;
            }
            .clients-slider-wrapper:hover .clients-scroll-plane {
              animation-play-state: paused;
            }
          `,
        }}
      />

      <Container className="mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight text-center">
          Our Clients
        </h2>
      </Container>

      {/* Infinite Horizontal Logo Slider in a single flat plane */}
      <div className="clients-slider-wrapper relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />

        <div className="clients-scroll-plane flex gap-6 sm:gap-8 items-center py-2 px-4">
          {duplicatedLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="w-[180px] sm:w-[220px] h-[90px] sm:h-[105px] rounded-2xl bg-white border border-neutral-200/70 shadow-xs hover:shadow-md hover:border-[#fe7900]/30 transition-all duration-300 flex items-center justify-center p-4 sm:p-5 shrink-0 group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={150}
                  height={45}
                  unoptimized
                  className="max-h-9 sm:max-h-10 w-auto max-w-[85%] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
