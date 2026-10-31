import React from "react";
import { Container } from "../ui/Container";

export interface CaptionItem {
  orangeHighlight: string;
  subTitle: string;
}

export interface CaptionPairProps {
  left: CaptionItem;
  right: CaptionItem;
}

export function CaptionPair({ left, right }: CaptionPairProps) {
  return (
    <div className="py-8 bg-white border-b border-neutral-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left item */}
          <div className="flex flex-col border-b md:border-b-0 pb-6 md:pb-0 border-neutral-100">
            <span className="text-base sm:text-lg lg:text-xl font-medium text-[#fe7900] mb-2 leading-snug">
              {left.orangeHighlight}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-neutral-600 font-light">
                {left.subTitle}
              </span>
            </div>
            <div className="w-16 h-[2px] bg-[#fe7900] mt-3" />
          </div>

          {/* Right item */}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg lg:text-xl font-medium text-[#fe7900] mb-2 leading-snug">
              {right.orangeHighlight}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-neutral-600 font-light">
                {right.subTitle}
              </span>
            </div>
            <div className="w-16 h-[2px] bg-neutral-300 mt-3" />
          </div>
        </div>
      </Container>
    </div>
  );
}
