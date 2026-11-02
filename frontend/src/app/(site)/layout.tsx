import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-[124px] sm:pt-[132px] lg:pt-[138px]">{children}</main>
      <WhatsAppButton />
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
