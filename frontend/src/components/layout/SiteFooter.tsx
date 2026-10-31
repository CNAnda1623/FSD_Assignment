import React from "react";
import Link from "next/link";
import { footerColumns } from "@/data/footer";
import { SmartImage } from "../ui/SmartImage";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#f3f3f3] text-neutral-600 border-t border-neutral-200">
      {/* 5 Column Link Grid */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {footerColumns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.isLocal ? (
                      <Link
                        href={link.href}
                        className="hover:text-[#fe7900] transition-colors block py-0.5"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#fe7900] transition-colors block py-0.5"
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

        {/* Divider */}
        <div className="w-full h-[1px] bg-neutral-200 mt-12 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-block">
              <SmartImage
                assetKey="brand.logo"
                width={100}
                height={22}
                className="w-24 h-auto object-contain opacity-90"
                alt="SUNGROW Logo"
              />
            </Link>
            <span>© 2026 SUNGROW. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.sungrowpower.com/in/en/privacy-policy-terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fe7900] transition-colors"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="https://www.sungrowpower.com/in/en/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fe7900] transition-colors"
            >
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
