import React from "react";
import Image from "next/image";
import { Container } from "../ui/Container";

export function GovernancePyramid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-neutral-100">
      <Container>
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <div className="relative w-full max-w-[820px] aspect-[749/422] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <Image
              src="/Images/sustainability/triangle.png"
              alt="Sustainability Governance Framework"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
