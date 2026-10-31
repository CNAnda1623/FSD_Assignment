"use client";

import React, { useEffect, useRef } from "react";
import { getAsset } from "@/lib/assets";
import { MediaPlaceholder } from "./MediaPlaceholder";

export interface SmartVideoProps {
  assetKey?: string;
  src?: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  label?: string;
}

export function SmartVideo({
  assetKey,
  src,
  poster,
  width,
  height,
  className,
  alt,
  label,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const asset = assetKey ? getAsset(assetKey) : undefined;
  const posterAsset = poster ? getAsset(poster) : undefined;

  const resolvedSrc = src || asset?.src;
  const resolvedPoster = posterAsset?.src || poster || asset?.poster;
  const resolvedWidth = width || asset?.width || 1920;
  const resolvedHeight = height || asset?.height || 1080;
  const assetId = asset?.id || (assetKey ? assetKey : "VID");

  // Pause off-screen video with IntersectionObserver to conserve system resources
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay might be blocked by browser policy; silently catch
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [resolvedSrc]);

  if (!resolvedSrc) {
    return (
      <MediaPlaceholder
        id={assetId}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={alt || asset?.alt || "Video placeholder"}
        className={className}
        label={label || (assetKey ? `Video: ${assetKey}` : "Video stream")}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={resolvedPoster}
      width={resolvedWidth}
      height={resolvedHeight}
      className={className}
    >
      <source
        src={resolvedSrc}
        type={resolvedSrc.endsWith(".mp4") ? "video/mp4" : "video/webm"}
      />
    </video>
  );
}
