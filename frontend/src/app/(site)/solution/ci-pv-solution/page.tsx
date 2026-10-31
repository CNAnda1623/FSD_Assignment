import type { Metadata } from "next";
import { ciData } from "@/data/ci";
import { HeroReveal } from "@/components/solution/HeroReveal";
import { CaptionPair } from "@/components/solution/CaptionPair";
import { HowItWorks } from "@/components/solution/HowItWorks";
import { CaseCard } from "@/components/solution/CaseCard";
import { ProductCard } from "@/components/solution/ProductCard";
import { ContactForm } from "@/components/solution/ContactForm";
import { FollowBar } from "@/components/layout/FollowBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { SmartVideo } from "@/components/ui/SmartVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "C&I PV Solution",
  description:
    "Enhanced Safety, Increased Returns: Commercial & Industrial PV Solutions by Sungrow.",
};

export default function CiPvSolutionPage() {
  const {
    hero,
    flexible,
    safety,
    optimization,
    install,
    om,
    howItWorks,
    cases,
    products,
  } = ciData;

  return (
    <div className="bg-white">
      {/* 1. Hero Reveal */}
      <HeroReveal
        assetKey={hero.assetKey}
        subLabel={hero.subLabel}
        headline={hero.headline}
      />

      {/* 2. Flexible Solutions for Maximum Value */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={flexible.heading}
            description={flexible.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[460px] lg:h-[580px] rounded-3xl overflow-hidden shadow-lg mx-auto">
            <SmartImage
              assetKey={flexible.assetKey}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
              alt={flexible.heading}
            />
          </div>
        </Container>
      </section>

      {/* 3. Advanced Safety */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            title={safety.heading}
            description={safety.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl mx-auto bg-black">
            <SmartVideo
              assetKey={safety.videoAssetKey}
              className="w-full h-full object-cover"
              alt={safety.heading}
            />
          </div>
        </Container>
      </section>

      {/* 4. Smart Optimization */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={optimization.heading}
            description={optimization.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl mx-auto bg-black mb-8">
            <SmartVideo
              assetKey={optimization.videoAssetKey}
              className="w-full h-full object-cover"
              alt={optimization.heading}
            />
          </div>
        </Container>

        <CaptionPair
          left={optimization.captions.left}
          right={optimization.captions.right}
        />
      </section>

      {/* 5. Effortless Installation & Commissioning */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            title={install.heading}
            description={install.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl mx-auto">
            <SmartImage
              assetKey={install.assetKey}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
              alt={install.heading}
            />
          </div>
        </Container>
      </section>

      {/* 6. Hassle-Free O&M */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={om.heading}
            description={om.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl mx-auto bg-black mb-8">
            <SmartVideo
              assetKey={om.videoAssetKey}
              className="w-full h-full object-cover"
              alt={om.heading}
            />
          </div>
        </Container>

        <CaptionPair left={om.captions.left} right={om.captions.right} />
      </section>

      {/* 7. How Does It Work? */}
      <HowItWorks
        title={howItWorks.title}
        description={howItWorks.description}
        rows={howItWorks.rows}
      />

      {/* 8. Cases & Stories */}
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

      {/* 9. Our Products */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            title={products.heading}
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {products.items.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              href={products.cta.href}
              isExternal={true}
              variant="outline-orange"
              size="md"
            >
              {products.cta.label}
            </Button>
          </div>
        </Container>
      </section>

      {/* 10. Contact Us Form */}
      <ContactForm />

      {/* 11. Follow SUNGROW */}
      <FollowBar />
    </div>
  );
}
