import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isExternal?: boolean;
  variant?:
    | "outline-orange"
    | "solid-orange"
    | "translucent-dark"
    | "outline-grey"
    | "solid-dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  isExternal = false,
  variant = "outline-orange",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-6 py-2.5 rounded-full gap-2",
    lg: "text-base px-8 py-3.5 rounded-full gap-2.5",
  }[size];

  const variantStyles = {
    "outline-orange":
      "border border-[#fe7900] text-[#fe7900] hover:bg-[#fe7900] hover:text-white bg-transparent",
    "solid-orange":
      "bg-[#fe7900] text-white hover:bg-[#e56d00] shadow-sm",
    "translucent-dark":
      "bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-black/70",
    "outline-grey":
      "border border-neutral-300 text-neutral-700 hover:border-neutral-800 hover:text-neutral-900 bg-white",
    "solid-dark":
      "bg-[#606060] text-white hover:bg-[#4d4d4d] rounded-md",
  }[variant];

  const combinedClassName = cn(baseStyles, sizeStyles, variantStyles, className);

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
