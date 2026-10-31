"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { internalLinks } from "@/lib/links";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMobileNav,
  openMegaMenu,
  closeMegaMenu,
  setNavRowHidden,
  selectNavRowHidden,
  selectActiveMegaMenu,
} from "@/store/slices/uiSlice";
import { selectAuthStatus, selectUser } from "@/store/slices/authSlice";
import { SmartImage } from "../ui/SmartImage";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { UserMenu } from "@/components/auth/UserMenu";
import { AccountDialogs } from "@/components/auth/AccountDialogs";

export function SiteHeader() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const navRowHidden = useAppSelector(selectNavRowHidden);
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#ffffff] border-b border-neutral-100/60 transition-transform duration-300">
        {/* ROW 1: Logo & Utility Bar (85px tall, 60px padding-x, strictly centered 148px logo) */}
        <div className="w-full px-4 sm:px-8 lg:px-[60px] h-[72px] sm:h-[85px] flex items-center justify-between relative">
          {/* Left: Region Flag + Country name (starts at x ~ 60px) */}
          <div className="flex items-center gap-2 z-10">
            <SmartImage
              assetKey="brand.flag"
              width={22}
              height={15}
              className="w-5 h-auto object-contain"
              alt="India"
            />
            <span className="hidden sm:inline text-xs font-medium text-neutral-700">
              India
            </span>
          </div>

          {/* Center: Sungrow Logo (strictly 148px wide, exactly centered at 50% page width, vertical center ~42px) */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded z-10"
          >
            <SmartImage
              assetKey="brand.logo"
              width={148}
              height={34}
              className="w-[124px] sm:w-[148px] h-auto object-contain"
              alt="SUNGROW Logo"
              priority
            />
          </Link>

          {/* Right: Search, Login & Mobile Hamburger (ends at x ~ 1844px) */}
          <div className="flex items-center gap-3 sm:gap-5 z-10">
            <a
              href="https://www.sungrowpower.com/in/en/search-results"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Search"
              className="p-1.5 text-neutral-600 hover:text-[#fe7900] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded-full"
            >
              <Search className="w-4 h-4 stroke-[1.8]" />
            </a>

            {/* Auth Session Right Cluster */}
            {authStatus === "loading" ? (
              // Same-width placeholder during loading: avoids layout jump and LOGIN flash
              <div
                className="hidden sm:block w-[68px] h-[28px]"
                aria-hidden="true"
              />
            ) : authStatus === "authenticated" && user ? (
              <UserMenu />
            ) : (
              <Link
                href={internalLinks.login}
                className="hidden sm:flex items-center gap-1.5 text-xs font-medium tracking-wider text-neutral-800 hover:text-[#fe7900] transition-colors px-2 py-1.5 rounded-full hover:bg-neutral-50"
              >
                <User className="w-3.5 h-3.5 text-neutral-600" />
                <span>LOGIN</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => dispatch(toggleMobileNav())}
              aria-label="Open mobile menu"
              className="xl:hidden p-1.5 text-neutral-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ROW 2: Desktop Navigation Bar (Hides on scroll down) */}
        <div
          className={`hidden xl:block border-t border-neutral-100 transition-all duration-300 overflow-hidden ${
            navRowHidden ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-8">
            <nav
              aria-label="Main Navigation"
              className="flex items-center justify-center gap-10 lg:gap-12 h-12"
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
