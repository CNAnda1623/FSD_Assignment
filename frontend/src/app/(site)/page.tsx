import type { Metadata } from "next";
import { HeroSequence } from "@/components/home/HeroSequence";
import { CleanPowerIntro } from "@/components/home/CleanPowerIntro";
import { ScenarioTabs } from "@/components/home/ScenarioTabs";
import { CommitmentCarousel } from "@/components/home/CommitmentCarousel";
import { StackedPanels } from "@/components/home/StackedPanels";
import { ClientsWorldSection } from "@/components/home/ClientsWorldSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { ClientsLogoSlider } from "@/components/home/ClientsLogoSlider";
import { FollowBar } from "@/components/layout/FollowBar";

export const metadata: Metadata = {
  title: "Home Page",
  description:
    "Clean Power for All - Sungrow is a global leader in PV inverter and energy storage systems.",
};

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <CleanPowerIntro />
      <ScenarioTabs />
      <CommitmentCarousel />
      <StackedPanels />
      <ClientsWorldSection />
      <NewsGrid />
      <ClientsLogoSlider />
      <FollowBar />
    </>
  );
}
