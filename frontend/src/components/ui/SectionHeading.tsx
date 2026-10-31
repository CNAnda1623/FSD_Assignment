import React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  showDivider?: boolean;
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({
  tag,
  title,
  description,
  align = "center",
  showDivider = false,
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-8 sm:mb-12",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {tag && (
        <span className="text-[#fe7900] text-sm sm:text-base font-semibold tracking-wide uppercase mb-3">
          {tag}
        </span>
      )}

      {showDivider && (
        <div className="w-[1px] h-8 sm:h-12 bg-[#fe7900] mb-4 opacity-70" />
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal tracking-tight leading-tight",
          dark ? "text-white" : "text-neutral-900",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-3xl text-sm sm:text-base leading-relaxed font-light",
            dark ? "text-neutral-300" : "text-neutral-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
