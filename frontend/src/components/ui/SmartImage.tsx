import React from "react";
import Image, { type ImageProps } from "next/image";
import { getAsset } from "@/lib/assets";
import { MediaPlaceholder } from "./MediaPlaceholder";

export interface SmartImageProps extends Partial<Omit<ImageProps, "alt">> {
  assetKey?: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  label?: string;
}

export function SmartImage({
  assetKey,
  src,
  alt,
  width,
  height,
  className,
  aspectRatio,
  label,
  priority,
  sizes,
  fill,
  unoptimized,
  ...rest
}: SmartImageProps) {
  const asset = assetKey ? getAsset(assetKey) : undefined;

  const resolvedSrc = src || asset?.src;
  const resolvedAlt = alt || asset?.alt || "Image";
  const resolvedWidth =
    width !== undefined ? Number(width) : asset?.width || 800;
  const resolvedHeight =
    height !== undefined ? Number(height) : asset?.height || 600;
  const assetId = asset?.id || (assetKey ? assetKey : "IMG");

  if (!resolvedSrc) {
    return (
      <MediaPlaceholder
        id={assetId}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={resolvedAlt}
        className={className}
        aspectRatio={aspectRatio}
        label={label}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={resolvedAlt}
      width={fill ? undefined : resolvedWidth}
      height={fill ? undefined : resolvedHeight}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      unoptimized={unoptimized ?? true}
      {...rest}
    />
  );
}
