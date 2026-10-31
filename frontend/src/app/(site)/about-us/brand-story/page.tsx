import type { Metadata } from "next";
import { brandStoryData } from "@/data/brandStory";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SmartVideo } from "@/components/ui/SmartVideo";
import { SmartImage } from "@/components/ui/SmartImage";
import { Container } from "@/components/ui/Container";
import { CapabilityCards } from "@/components/about/CapabilityCards";
import { FullBleedVideo } from "@/components/about/FullBleedVideo";
import { MilestoneSlider } from "@/components/about/MilestoneSlider";

export const metadata: Metadata = {
  title: "Brand Story",
  description:
    "Explore the Brand Story of Sungrow - Global Leader of Clean Energy Conversion Technology.",
};

export default function BrandStoryPage() {
  const { hero, mission, leader, bridge, together } = brandStoryData;

  return (
    <div className="bg-white">
      {/* 1. Hero Video / Mobile Image Section */}
      <section className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] overflow-hidden flex items-center justify-center bg-black">
        {/* Tablet / Pad & Desktop Video (>= sm) */}
        <div className="hidden sm:block absolute inset-0 w-full h-full z-0">
          <SmartVideo
            assetKey={hero.videoAssetKey}
            className="w-full h-full object-cover brightness-[0.7]"
            alt="Brand Story Hero"
          />
        </div>

        {/* Small Devices Only (< sm / phones) -> replaced with 1.jpg */}
        <div className="block sm:hidden absolute inset-0 w-full h-full z-0">
          <SmartImage
            assetKey="brand.hero.mobileImage"
            fill
            priority
            className="object-cover object-center brightness-[0.75]"
            alt="Brand Story Hero Mobile"
          />
        </div>

        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white drop-shadow-md text-center px-4">
          {hero.title}
        </h1>
      </section>

      {/* 2. Mission Section */}
      <section className="py-20 lg:py-28 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            tag={mission.heading}
            title=""
            showDivider={true}
            align="center"
            className="mb-6"
          />
          <ScrollRevealText text={mission.description} className="mb-12" />
          <div className="w-[1px] h-12 bg-[#fe7900] mx-auto opacity-70" />
        </Container>
      </section>

      {/* 3. Global Leader Section & 4. Capability Cards */}
      <section className="pt-20 lg:pt-28 pb-10 bg-[#f5f5f5]">
        <Container>
          <SectionHeading
            title={leader.heading}
            description={leader.description}
            align="center"
            className="mb-8"
          />
        </Container>
        <CapabilityCards />
      </section>

      {/* 5. Bridge to A Sustainable Future */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <SectionHeading
            title={bridge.heading}
            description={bridge.description}
            align="center"
          />
        </Container>
      </section>

      {/* 6. Full-Bleed Video with Caption */}
      <FullBleedVideo
        assetKey={bridge.videoAssetKey}
        caption={bridge.caption}
      />

      {/* 7. Together, We Build A Sustainable Future */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <SectionHeading
            title={together.heading}
            description={together.description}
            align="center"
            className="mb-12"
          />

          <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[620px] rounded-3xl overflow-hidden shadow-xl mx-auto">
            <SmartImage
              assetKey={together.assetKey}
              fill
              className="object-cover object-center"
              alt={together.heading}
            />
          </div>
        </Container>
      </section>

      {/* 8. Milestones Slider */}
      <MilestoneSlider />
    </div>
  );
}
