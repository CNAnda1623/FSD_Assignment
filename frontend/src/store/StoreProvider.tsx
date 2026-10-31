/* eslint-disable react-hooks/refs */
"use client";

import React, { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore, type AppStore } from "./makeStore";
import { SessionBootstrap } from "@/components/auth/SessionBootstrap";
import { RouteChangeListener } from "@/components/layout/RouteChangeListener";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      // setupListeners configures refetchOnFocus and refetchOnReconnect
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <SessionBootstrap />
      <RouteChangeListener />
      {children}
    </Provider>
  );
}
