"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setScrollDirection,
  setScrollY,
  selectScrollDirection,
} from "@/store/slices/uiSlice";

/**
 * High-performance hook that synchronizes scroll direction and scroll position
 * with the Redux UI state store, preventing redundant scroll listeners.
 */
export function useScrollDirection(threshold = 10, minScroll = 120) {
  const dispatch = useAppDispatch();
  const scrollDir = useAppSelector(selectScrollDirection);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
        if (currentScrollY > lastScrollY && currentScrollY > minScroll) {
          dispatch(setScrollDirection("down"));
        } else {
          dispatch(setScrollDirection("up"));
        }
        dispatch(setScrollY(currentScrollY));
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, minScroll, dispatch]);

  return scrollDir;
}
