"use client";

import { useRouteLoading } from "@/hooks/use-route-loading";

export function NavigationBar() {
  const { isLoading } = useRouteLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-df-accent/20">
      <div className="h-full bg-df-accent animate-navigation-bar" />
    </div>
  );
}
