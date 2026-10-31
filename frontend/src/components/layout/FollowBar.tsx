import React from "react";
import { socialLinks } from "@/data/footer";
import { SmartImage } from "../ui/SmartImage";

export function FollowBar() {
  return (
    <div className="w-full bg-[#f8f8f8] border-t border-neutral-200/60 py-6">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-600">
          Follow SUNGROW
        </span>

        <div className="flex items-center gap-6">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow Sungrow on ${item.name}`}
              className="p-1 text-neutral-400 hover:text-[#fe7900] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe7900] rounded"
            >
              <SmartImage
                assetKey={item.assetKey}
                width={20}
                height={20}
                className="w-5 h-5 object-contain opacity-75 hover:opacity-100 transition-opacity"
                alt={item.name}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
