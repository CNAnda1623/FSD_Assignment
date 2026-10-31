"use client";

import React from "react";
import Link from "next/link";
import { type MegaMenuItem } from "@/data/navigation";
import { useAppDispatch } from "@/store/hooks";
import { closeMegaMenu } from "@/store/slices/uiSlice";

export interface MegaMenuProps {
  item: MegaMenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  const dispatch = useAppDispatch();

  if (!isOpen || !item.columns || item.columns.length === 0) {
    return null;
  }

  const handleLinkClick = () => {
    dispatch(closeMegaMenu());
    onClose();
  };

  return (
    <div
      role="region"
      aria-label={`${item.label} sub-navigation`}
      className="absolute top-full left-0 w-full bg-white/20 backdrop-blur-xl border-t border-neutral-200/40 shadow-2xl z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1360px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {item.columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#fe7900] mb-4 pb-1 border-b border-neutral-200/50 drop-shadow-2xs">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.isLocal ? (
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="text-sm font-medium text-neutral-800 hover:text-[#fe7900] transition-colors block py-0.5 drop-shadow-2xs"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="text-sm font-medium text-neutral-800 hover:text-[#fe7900] transition-colors block py-0.5 drop-shadow-2xs"
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
      </div>
    </div>
  );
}
