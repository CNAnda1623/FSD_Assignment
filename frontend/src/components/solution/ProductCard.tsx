import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

export interface ProductItem {
  id: string;
  category: string;
  name: string;
  assetKey: string;
  learnMoreUrl: string;
  docUrl: string;
}

export interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-start text-left w-full">
      {/* Category on Top */}
      <div className="mb-3">
        <span className="text-xs sm:text-sm font-medium text-[#fe7900]">
          {product.category}
        </span>
      </div>

      {/* Product Image */}
      <div className="w-full h-[220px] sm:h-[240px] relative mb-4 flex items-center justify-center p-2">
        <SmartImage
          assetKey={product.assetKey}
          width={360}
          height={280}
          className="max-h-full w-auto object-contain"
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className="mb-6 w-full">
        <h3 className="text-2xl sm:text-[28px] font-normal text-neutral-900 leading-tight">
          {product.name}
        </h3>
      </div>

      {/* Stacked Full-Width Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <Button
          href={product.learnMoreUrl}
          isExternal={true}
          variant="outline-grey"
          size="md"
          className="w-full rounded-full justify-center text-sm py-2.5 font-normal text-neutral-800 hover:text-black border-neutral-300"
        >
          Learn More
        </Button>
        <Button
          href={product.docUrl}
          isExternal={true}
          variant="outline-grey"
          size="md"
          className="w-full rounded-full justify-center text-sm py-2.5 font-normal text-neutral-800 hover:text-black border-neutral-300"
        >
          Documents & Installation
        </Button>
      </div>
    </div>
  );
}
