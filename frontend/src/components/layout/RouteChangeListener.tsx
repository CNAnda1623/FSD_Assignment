"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { closeAllOverlays } from "@/store/slices/uiSlice";

export function RouteChangeListener() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(closeAllOverlays());
  }, [pathname, dispatch]);

  return null;
}
