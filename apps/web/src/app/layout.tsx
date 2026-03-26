import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/lib/react-query/provider";
import { Toaster } from "@/components/ui/sonner";
import { NavigationBar } from "@/components/layout/navigation-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DataFlow — Processamento de Dados em Alta Performance",
  description:
    "Plataforma moderna para upload, processamento assíncrono e visualização de grandes volumes de dados CSV com dashboards interativos.",
  keywords: ["processamento de dados", "CSV", "dashboard", "analytics", "BullMQ"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans antialiased", inter.className)}>
      <body className="min-h-screen bg-df-light-bg text-df-light-text">
        <Suspense fallback={null}>
          <NavigationBar />
        </Suspense>
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
