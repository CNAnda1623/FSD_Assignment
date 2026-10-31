import type { Metadata } from "next";
import { residentialData } from "@/data/residential";
import { HeroReveal } from "@/components/solution/HeroReveal";
import { HowItWorks } from "@/components/solution/HowItWorks";
import { CaseCard } from "@/components/solution/CaseCard";
import { ProductCard } from "@/components/solution/ProductCard";
import { ContactForm } from "@/components/solution/ContactForm";
import { FollowBar } from "@/components/layout/FollowBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Residential PV + ESS + EV Charging Solution",
  description:
    "Clean Power, Carbon-Free Life: All-in-one Residential Solar, Storage, and EV Charging by Sungrow.",
};

export default function ResidentialSolutionPage() {
  const {
    hero,
    block1,
    block2,
    block3,
    block4,
    block5,
    howItWorks,
    service,
    cases,
    products,
  } = residentialData;

  return (
    <div className="bg-white">
      {/* 1. Hero Reveal */}
      <HeroReveal
        assetKey={hero.assetKey}
        subLabel={hero.subLabel}
        headline={hero.headline}
      />

      {/* 2. Solutions that Bring Zero-Carbon Energy to Every Home */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={block1.heading}
            description={block1.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden shadow-lg mx-auto">
            <SmartImage
              assetKey={block1.assetKey}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              alt={block1.heading}
            />
          </div>
        </Container>
      </section>

      {/* 3. Efficient and Reliable Clean Energy */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            title={block2.heading}
            description={block2.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden shadow-lg mx-auto">
            <SmartImage
              assetKey={block2.assetKey}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              alt={block2.heading}
            />
          </div>
        </Container>
      </section>

      {/* 4. Triple Protection, Worry-Free Design */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={block3.heading}
            description={block3.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[580px] rounded-3xl overflow-hidden shadow-lg mx-auto">
            <SmartImage
              assetKey={block3.assetKey}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              alt={block3.heading}
            />
          </div>
        </Container>
      </section>

      {/* 5. An Intuitive Experience (Split 2-Column) */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight leading-tight mb-6">
                {block4.heading}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                {block4.description}
              </p>
            </div>

            <div className="lg:col-span-7 relative h-[300px] sm:h-[420px] rounded-3xl overflow-hidden shadow-md">
              <SmartImage
                assetKey={block4.assetKey}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
                alt={block4.heading}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Powered by The Sun, Managed by iSolarCloud */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="relative w-full h-[340px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl mb-12">
            <SmartImage
              assetKey={block5.assetKey}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center"
              alt={block5.heading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            <div className="md:col-span-6">
              <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 leading-snug">
                {block5.heading}
              </h3>
            </div>
            <div className="md:col-span-6">
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                {block5.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. How Does It Work? */}
      <HowItWorks
        title={howItWorks.title}
        description={howItWorks.description}
        rows={howItWorks.rows}
      />

      {/* 8. Service That Goes Above and Beyond (Banner with 3 overlay pillars) */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl min-h-[460px] lg:min-h-[520px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white bg-neutral-900 isolate">
            <SmartImage
              assetKey={service.assetKey}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center absolute inset-0 z-0 brightness-[0.55]"
              alt={service.heading}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10 pointer-events-none" />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight relative z-20 max-w-xl">
              {service.heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative z-20 pt-8 border-t border-white/20">
              {service.pillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col">
                  <h4 className="text-base sm:text-lg font-medium text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Hear from Our Customers and Partners */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading title={cases.heading} align="center" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {cases.items.map((item) => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              href={cases.cta.href}
              isExternal={true}
              variant="outline-orange"
              size="md"
            >
              {cases.cta.label}
            </Button>
          </div>
        </Container>
      </section>

      {/* 10. Our Products (Single Product: iSolarCloud) */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <div className="flex flex-col items-start w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight mb-10 text-left">
              {products.heading}
            </h2>

            <div className="w-full max-w-[360px] sm:max-w-[380px]">
              <ProductCard product={products.item} />
            </div>
          </div>
        </Container>
      </section>

      {/* 11. Contact Us Form */}
      <ContactForm />

      {/* 12. Follow SUNGROW */}
      <FollowBar />
    </div>
  );
}
