"use client";

import { useGetMeQuery } from "@/store/api/authApi";

/**
 * SessionBootstrap:
 * Mounts inside StoreProvider once at root layout.
 * Triggers getMe on mount to bootstrap session.
 */
export function SessionBootstrap() {
  useGetMeQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return null;
}
