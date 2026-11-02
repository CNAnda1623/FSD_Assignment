"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMobileNav,
  openMegaMenu,
  closeMegaMenu,
  selectActiveMegaMenu,
} from "@/store/slices/uiSlice";
import { SmartImage } from "../ui/SmartImage";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { AccountDialogs } from "@/components/auth/AccountDialogs";

export function SiteHeader() {
  const dispatch = useAppDispatch();
  const activeMegaMenuId = useAppSelector(selectActiveMegaMenu);

  // Synchronize global scroll direction with Redux
  useScrollDirection();

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = navigationItems.find((item) => item.id === hoveredItemId);

  const handleMouseEnter = (id: string, isDirectLink?: boolean) => {
    if (isDirectLink) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setHoveredItemId(null);
      dispatch(closeMegaMenu());
      return;
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setHoveredItemId(id);
    dispatch(openMegaMenu(id));
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredItemId(null);
      dispatch(closeMegaMenu());
    }, 180);
  };

  // Close mega menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredItemId(null);
        dispatch(closeMegaMenu());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const marqueeMessage =
    "Are you looking for Extra High Voltage Engineering Consultancy Services in Kolkata ? We are providing the same for Substations and Transmission Lines upto 765kV Voltage level.";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white transition-transform duration-300 shadow-xs">
        {/* ================= STRIP 1: TOP BLACK SLIM STRIP ================= */}
        <div className="w-full bg-[#0a0a0a] text-white border-b border-neutral-900/80 px-3 sm:px-6 lg:px-10 h-[38px] flex items-center justify-between relative overflow-hidden select-none">
          {/* LEFT: Flag + Phone Number */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
            {/* India Flag */}
            <div className="flex items-center gap-1.5">
              <SmartImage
                assetKey="brand.flag"
                width={18}
                height={12}
                className="w-4 sm:w-4.5 h-auto object-contain rounded-[1px]"
                alt="India"
              />
              <span className="hidden sm:inline text-[11px] font-semibold text-neutral-300 tracking-wider uppercase">
                India
              </span>
            </div>

            <span className="text-neutral-700 text-xs hidden sm:inline">|</span>

            {/* Phone Number */}
            <a
              href="tel:+913371482187"
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-neutral-200 hover:text-[#fe7900] transition-colors whitespace-nowrap"
              title="Call Consultancy Desk"
            >
              <Phone className="w-3 h-3 text-[#fe7900] shrink-0" />
              <span className="tracking-wide">+91 3371 4821 87</span>
            </a>
          </div>

          {/* CENTER: ~70% Reserved Space with Moving Marquee Text (Right to Left) */}
          <div
            className="flex-1 min-w-0 overflow-hidden relative mx-2 sm:mx-6 h-full flex items-center justify-start"
            title={marqueeMessage}
          >
            <div className="animate-marquee-rtl flex whitespace-nowrap items-center py-1 cursor-default">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className="text-[11px] sm:text-xs font-medium text-amber-300/95 tracking-wide inline-flex items-center gap-2 pr-7 sm:pr-8 shrink-0"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fe7900] animate-pulse shrink-0" />
                  <span>{marqueeMessage}</span>
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Social Media Logos */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-10">
            <a
              href="https://www.linkedin.com/company/sungrow-power-supply-co-ltd/posts/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1 text-neutral-400 hover:text-[#fe7900] transition-colors"
            >
              <SmartImage
                assetKey="social.linkedin"
                width={14}
                height={14}
                className="w-3.5 h-3.5 brightness-0 invert opacity-75 hover:opacity-100 transition-opacity"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.facebook.com/CleanPowerForAll"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 text-neutral-400 hover:text-[#fe7900] transition-colors"
            >
              <SmartImage
                assetKey="social.facebook"
                width={14}
                height={14}
                className="w-3.5 h-3.5 brightness-0 invert opacity-75 hover:opacity-100 transition-opacity"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/sungrow_power/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1 text-neutral-400 hover:text-[#fe7900] transition-colors"
            >
              <SmartImage
                assetKey="social.instagram"
                width={14}
                height={14}
                className="w-3.5 h-3.5 brightness-0 invert opacity-75 hover:opacity-100 transition-opacity"
                alt="Instagram"
              />
            </a>
          </div>
        </div>

        {/* ================= STRIP 2 & 3 COMBINED: WHITE MAIN HEADER ================= */}
        {/* Height accommodates both side logos (HPP on left, ISO on right) */}
        {/* Strip 3 (Navbar) positioned lower down */}
        <div className="w-full bg-white border-b border-neutral-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="w-full px-4 sm:px-6 lg:px-10 h-[86px] sm:h-[94px] lg:h-[100px] flex items-center justify-between relative">
            {/* LEFT LOGO: HPP logo (spans combined height of strips 2 & 3, stays strictly below black strip) */}
            <div className="flex items-center shrink-0 z-10">
              <SmartImage
                assetKey="brand.hpp"
                width={82}
                height={82}
                className="h-[62px] sm:h-[72px] lg:h-[82px] w-auto object-contain hover:scale-[1.02] transition-transform"
                alt="HPP Logo"
              />
            </div>

            {/* CENTER: Navigation Navbar placed lower down in strip 3 */}
            <div className="flex-1 flex flex-col justify-end items-center h-full px-2 lg:px-6 pb-2">
              <nav
                aria-label="Main Navigation"
                className="hidden xl:flex items-center justify-center gap-8 lg:gap-10 xl:gap-12 h-12"
              >
                {navigationItems.map((item) => {
                  if (item.isDirectLink && item.href) {
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="text-sm font-medium text-neutral-700 hover:text-[#fe7900] transition-colors py-3"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const isActive =
                    hoveredItemId === item.id || activeMegaMenuId === item.id;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() =>
                        handleMouseEnter(item.id, item.isDirectLink)
                      }
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      <button
                        type="button"
                        aria-expanded={isActive}
                        onClick={() => {
                          if (isActive) {
                            setHoveredItemId(null);
                            dispatch(closeMegaMenu());
                          } else {
                            setHoveredItemId(item.id);
                            dispatch(openMegaMenu(item.id));
                          }
                        }}
                        className={`text-sm font-medium transition-colors py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded cursor-pointer ${
                          isActive
                            ? "text-[#fe7900]"
                            : "text-neutral-700 hover:text-[#fe7900]"
                        }`}
                      >
                        {item.label}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT LOGO: ISO logo (spans combined height of strips 2 & 3, stays strictly below black strip) */}
            <div className="flex items-center gap-3 shrink-0 z-10">
              <SmartImage
                assetKey="brand.iso"
                width={82}
                height={82}
                className="h-[62px] sm:h-[72px] lg:h-[82px] w-auto object-contain rounded shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform"
                alt="ISO Certified Logo"
              />

              {/* Mobile Hamburger Button (< xl screens) */}
              <button
                type="button"
                onClick={() => dispatch(toggleMobileNav())}
                aria-label="Open mobile menu"
                className="xl:hidden p-1.5 text-neutral-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded ml-1"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Desktop Mega Menu */}
        {activeItem && !activeItem.isDirectLink && (
          <div
            onMouseEnter={() => handleMouseEnter(activeItem.id)}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenu
              item={activeItem}
              isOpen={Boolean(hoveredItemId)}
              onClose={() => {
                setHoveredItemId(null);
                dispatch(closeMegaMenu());
              }}
            />
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Account Dialogs (Reset Password & Delete Account) */}
      <AccountDialogs />
    </>
  );
}
