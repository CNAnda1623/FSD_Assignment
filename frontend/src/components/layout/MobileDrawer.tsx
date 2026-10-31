"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, User, Search } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { internalLinks } from "@/lib/links";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileNav, selectMobileNavOpen } from "@/store/slices/uiSlice";
import { selectAuthStatus, selectUser, logoutUser } from "@/store/slices/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";
import { SmartImage } from "../ui/SmartImage";

export function MobileDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectMobileNavOpen);
  const authStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeDrawer = () => {
    dispatch(toggleMobileNav());
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // Ignore
    } finally {
      dispatch(logoutUser());
      closeDrawer();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <SmartImage
            assetKey="brand.flag"
            width={22}
            height={15}
            className="w-5 h-auto object-contain"
            alt="India"
          />
          <span className="text-xs font-medium text-neutral-700">India</span>
        </div>

        <Link href="/" onClick={closeDrawer} className="flex items-center">
          <SmartImage
            assetKey="brand.logo"
            width={110}
            height={26}
            className="w-28 h-auto object-contain"
            alt="SUNGROW Logo"
          />
        </Link>

        <button
          onClick={closeDrawer}
          aria-label="Close navigation"
          className="p-2 text-neutral-700 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Login & Search Controls */}
      <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
        {authStatus === "authenticated" && user ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#bf9a64] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <User className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate max-w-[180px]">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-neutral-500 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <Link
              href={internalLinks.login}
              onClick={closeDrawer}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium text-neutral-800 hover:border-[#fe7900] hover:text-[#fe7900] transition-colors"
            >
              <User className="w-4 h-4 text-neutral-600" />
              <span>LOGIN</span>
            </Link>

            <a
              href="https://www.sungrowpower.com/in/en/search-results"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-neutral-600 hover:text-neutral-900 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </a>
          </div>
        )}
      </div>

      {/* Nav Accordion List */}
      <div className="flex-1 px-5 py-4 divide-y divide-neutral-100">
        {navigationItems.map((item) => {
          if (item.isDirectLink && item.href) {
            return (
              <div key={item.id} className="py-3">
                <Link
                  href={item.href}
                  onClick={closeDrawer}
                  className="block text-base font-medium text-neutral-900 hover:text-[#fe7900] transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            );
          }

          const isExpanded = !!openAccordions[item.id];

          return (
            <div key={item.id} className="py-3">
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                className="flex items-center justify-between w-full text-left text-base font-medium text-neutral-900 hover:text-[#fe7900] transition-colors"
                aria-expanded={isExpanded}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                    isExpanded ? "rotate-180 text-[#fe7900]" : ""
                  }`}
                />
              </button>

              {isExpanded && item.columns && (
                <div className="mt-3 pl-3 space-y-4 border-l-2 border-[#fe7900]/30 animate-in fade-in slide-in-from-top-1">
                  {item.columns.map((col, cIdx) => (
                    <div key={cIdx} className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#fe7900]">
                        {col.title}
                      </p>
                      <ul className="space-y-1.5">
                        {col.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            {link.isLocal ? (
                              <Link
                                href={link.href}
                                onClick={closeDrawer}
                                className="block text-sm text-neutral-700 hover:text-[#fe7900] py-1"
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeDrawer}
                                className="block text-sm text-neutral-700 hover:text-[#fe7900] py-1"
                              >
                                {link.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
