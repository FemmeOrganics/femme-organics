"use client";

import type React from "react";
import { Suspense, createContext, useContext, useEffect, useState, useTransition } from "react";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

export const TransitionContext = createContext<TransitionContextType | null>(
  null,
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, startTransition] = useTransition();
  // const [isMounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if(!isMounted) return

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionProvider() {
  const context = useContext(TransitionContext);

  if (context === null) {
    throw new Error(
      "useTransitionProvider must be used within a DashboardProvider",
    );
  }

  return context;
}

export function SuspenseWithTransition({
  fallback,
  children,
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isTransitioning } = useTransitionProvider();

  if (isTransitioning) {
    return <>{fallback}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}

