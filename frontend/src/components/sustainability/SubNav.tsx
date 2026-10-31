"use client";

import React, { useState, useEffect } from "react";
import { sustainabilityData } from "@/data/sustainability";
import { useAppSelector } from "@/store/hooks";
import { Container } from "../ui/Container";

export function SubNav() {
  const { subNav } = sustainabilityData;
  const [activeSection, setActiveSection] = useState(subNav[0]?.id || "overview");
  const navRowHidden = useAppSelector((state) => state.ui.navRowHidden);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // account for sticky header & subnav
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // IntersectionObserver to sync active tab with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = subNav.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          const item = subNav[i];
          if (item && item.id !== activeSection) {
            setActiveSection(item.id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [subNav, activeSection]);

  return (
    <div
      className={`sticky z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-2xs transition-all duration-300 ${
        navRowHidden
          ? "top-14 sm:top-16"
          : "top-14 sm:top-16 xl:top-28"
      }`}
    >
      <Container>
        <nav
          aria-label="Sustainability sub-navigation"
          className="flex items-center justify-center gap-6 sm:gap-12 overflow-x-auto no-scrollbar py-3.5"
        >
          {subNav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`relative py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#fe7900] font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fe7900] rounded-full animate-in fade-in" />
                )}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
