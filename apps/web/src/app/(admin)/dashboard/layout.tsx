"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-df-bg-primary">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-14 flex items-center gap-4 border-b border-df-surface/15 px-6 bg-df-bg-deep/50 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="text-df-muted hover:text-df-text transition-colors cursor-pointer" />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <span className="text-df-muted text-xs">v1.0.0</span>
              <div className="w-2 h-2 rounded-full bg-df-success animate-pulse" />
              <span className="text-df-success text-xs font-medium">
                Online
              </span>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
