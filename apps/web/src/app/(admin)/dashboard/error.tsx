"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-df-error/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-df-error" />
        </div>
        <h2 className="text-df-white text-xl font-semibold">
          Algo deu errado
        </h2>
        <p className="text-df-muted text-sm">
          Ocorreu um erro ao carregar o dashboard. Tente novamente.
        </p>
        <Button
          onClick={reset}
          className="bg-df-accent hover:bg-df-accent-hover text-white gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
