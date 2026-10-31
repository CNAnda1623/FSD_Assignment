import type { Metadata } from "next";
import { sustainabilityData } from "@/data/sustainability";
import { SmartImage } from "@/components/ui/SmartImage";
import { SubNav } from "@/components/sustainability/SubNav";
import { ClimateTargets } from "@/components/sustainability/ClimateTargets";
import { GovernancePyramid } from "@/components/sustainability/GovernancePyramid";
import { StrategyTabs } from "@/components/sustainability/StrategyTabs";
import { ReportCarousel } from "@/components/sustainability/ReportCarousel";
import { HonorsSlider } from "@/components/sustainability/HonorsSlider";
import { NewsCards } from "@/components/sustainability/NewsCards";
import { EsgContactBanner } from "@/components/sustainability/EsgContactBanner";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Discover Sungrow's Sustainability Strategy, Climate Targets, Governance Framework and ESG Reports.",
};

export default function SustainabilityPage() {
  const { hero } = sustainabilityData;

  return (
    <div className="bg-white">
      {/* 1. Hero Image Section */}
      <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] overflow-hidden flex items-center bg-black">
        <div className="absolute inset-0 z-0">
          <SmartImage
            assetKey={hero.assetKey}
            fill
            priority
            className="object-cover object-center brightness-[0.8]"
            alt="Sustainability Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight max-w-xl drop-shadow-md">
            {hero.titleLines[0]} <br />
            <span className="font-normal">{hero.titleLines[1]}</span>
          </h1>
        </div>
      </section>

      {/* 2. Sticky Sub Navigation */}
      <SubNav />

      {/* 3. Climate Targets (#overview) */}
      <ClimateTargets />

      {/* 4. Governance Pyramid */}
      <GovernancePyramid />

      {/* 5. Strategy Tabs (#strategy) */}
      <StrategyTabs />

      {/* 6. Reports and Policies (#reports) */}
      <ReportCarousel />

      {/* 7. Honors and Rewards */}
      <HonorsSlider />

      {/* 8. Latest News */}
      <NewsCards />

      {/* 9. Contact ESG Banner */}
      <EsgContactBanner />
    </div>
  );
}
