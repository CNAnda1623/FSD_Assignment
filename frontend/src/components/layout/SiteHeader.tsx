"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { navigationItems } from "@/data/navigation";
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

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = navigationItems.find((item) => item.id === hoveredItemId);

  // Scroll listener for Main Header slide-hide / slide-show behavior
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;
    let ticking = false;

    const HEADER_HEIGHT = 70;
    const DELTA_THRESHOLD = 5;

    const updateHeader = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY;

      // At the very top (or Safari negative bounce)
      if (currentScrollY <= 0) {
        setIsHidden(false);
      } else if (delta > DELTA_THRESHOLD && currentScrollY > HEADER_HEIGHT) {
        // Scrolling DOWN past header height -> hide Main Header
        setIsHidden(true);
        dispatch(closeMegaMenu());
        setHoveredItemId(null);
      } else if (delta < -DELTA_THRESHOLD) {
        // Scrolling UP even by a small amount -> show Main Header immediately
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

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
      {/* =========================================================================
          LAYER A: TOP BAR (Normal document flow, NOT sticky)
          Scrolls out of view with the page. Only reappears when scrollY <= 0.
          ========================================================================= */}
      <div className="w-full bg-[#0a0a0a] text-white border-b border-neutral-900/80 px-3 sm:px-6 lg:px-10 h-[38px] flex items-center justify-between relative select-none z-30">
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

        {/* CENTER: Reserved Space with Auto-Scrolling Ticker (50px margin on left & right) */}
        <div
          className="ticker flex-1 min-w-0 overflow-hidden relative h-full flex items-center"
          title={marqueeMessage}
        >
          <div className="ticker__track flex items-center whitespace-nowrap cursor-default">
            {/* Copy 1: Primary readable stream */}
            <div className="ticker__content flex items-center shrink-0">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={`c1-${idx}`}
                  className="text-[11px] sm:text-xs font-medium text-amber-300/95 tracking-wide inline-flex items-center gap-2 pr-10 shrink-0"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fe7900] animate-pulse shrink-0" />
                  <span>{marqueeMessage}</span>
                </span>
              ))}
            </div>

            {/* Copy 2: Duplicate for seamless infinite loop (hidden from assistive tech) */}
            <div
              className="ticker__content flex items-center shrink-0"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={`c2-${idx}`}
                  className="text-[11px] sm:text-xs font-medium text-amber-300/95 tracking-wide inline-flex items-center gap-2 pr-10 shrink-0"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fe7900] animate-pulse shrink-0" />
                  <span>{marqueeMessage}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Social Media Logos */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-10">
          <a
            href="https://www.linkedin.com/"
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
            href="https://www.facebook.com/"
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
            href="https://www.instagram.com/"
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

      {/* =========================================================================
          LAYER B: MAIN HEADER (Sticky at top: 0, 70px height)
          Hides on scroll-down, shows immediately on scroll-up (with NO top bar).
          ========================================================================= */}
      <header
        className={`sticky top-0 z-40 w-full bg-white border-b border-neutral-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] header ${
          isHidden ? "header--hidden" : ""
        }`}
        style={{ height: "var(--header-h, 70px)" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between relative">
          {/* LEFT LOGO: HPP Logo (scaled to fit inside 70px, never overflowing) */}
          <div className="flex items-center shrink-0 z-10 h-full py-2">
            <Link href="/" className="inline-flex items-center h-full">
              <SmartImage
                assetKey="brand.hpp"
                width={56}
                height={56}
                className="max-h-[52px] w-auto object-contain hover:scale-[1.02] transition-transform"
                alt="Hind Power Project"
                priority
              />
            </Link>
          </div>

          {/* CENTER: Navigation Navbar (Vertically centered) */}
          <div className="flex-1 flex items-center justify-center h-full px-2 lg:px-6">
            <nav
              aria-label="Main Navigation"
              className="hidden xl:flex items-center justify-center gap-8 lg:gap-10 xl:gap-12 h-full"
            >
              {navigationItems.map((item) => {
                if (item.isDirectLink && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-sm font-medium text-neutral-700 hover:text-[#fe7900] transition-colors py-2"
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
                    className="relative flex items-center h-full"
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
                      className={`text-sm font-medium transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded cursor-pointer ${
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

          {/* RIGHT LOGO: ISO Logo & Mobile Hamburger (scaled to fit inside 70px) */}
          <div className="flex items-center gap-3 shrink-0 z-10 h-full py-2">
            <SmartImage
              assetKey="brand.iso"
              width={56}
              height={56}
              className="max-h-[50px] w-auto object-contain rounded shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform"
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
