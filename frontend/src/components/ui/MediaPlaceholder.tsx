import React from "react";
import { cn } from "@/lib/cn";

export interface MediaPlaceholderProps {
  id?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  aspectRatio?: string; // e.g. "16/9", "4/3", "1/1"
  label?: string;
}

export function MediaPlaceholder({
  id = "TODO",
  width,
  height,
  alt,
  className,
  aspectRatio,
  label,
}: MediaPlaceholderProps) {
  // Compute inline aspect ratio style if width & height provided
  const style: React.CSSProperties = {};
  if (aspectRatio) {
    style.aspectRatio = aspectRatio;
  } else if (width && height) {
    style.aspectRatio = `${width} / ${height}`;
  }

  return (
    <div
      role="img"
      aria-label={alt || `Placeholder for asset ${id}`}
      style={style}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-neutral-200/80 p-3 text-neutral-500 select-none border border-neutral-300/60 transition-colors",
        className
      )}
      data-asset-id={id}
    >
      {/* Background subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center gap-1">
        <span className="text-[11px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-neutral-300/80 text-neutral-700">
          TODO(asset): {id}
        </span>
        {(label || alt) && (
          <span className="text-[12px] text-neutral-600 line-clamp-1 max-w-[90%] font-medium">
            {label || alt}
          </span>
        )}
      </div>
    </div>
  );
}
