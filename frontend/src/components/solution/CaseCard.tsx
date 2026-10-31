import React from "react";
import { SmartImage } from "../ui/SmartImage";

export interface CaseItem {
  id: string;
  tag: string;
  title: string;
  assetKey: string;
  href: string;
}

export interface CaseCardProps {
  item: CaseItem;
}

export function CaseCard({ item }: CaseCardProps) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
    >
      <div className="relative w-full h-[240px] sm:h-[280px] overflow-hidden bg-neutral-100">
        <SmartImage
          assetKey={item.assetKey}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          alt={item.title}
        />
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#fe7900] mb-3">
            {item.tag}
          </span>
          <h3 className="text-lg sm:text-xl font-medium text-neutral-900 group-hover:text-[#fe7900] transition-colors leading-snug">
            {item.title}
          </h3>
        </div>
      </div>
    </a>
  );
}
