"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadResponseDTO } from "@dataflow/types";
import {
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

interface UploadsTableProps {
  data?: UploadResponseDTO[];
  isLoading: boolean;
}

const statusConfig = {
  PENDING: {
    label: "Pendente",
    variant: "outline" as const,
    icon: Clock,
    className: "border-df-warning/30 text-df-warning bg-df-warning/10",
  },
  PROCESSING: {
    label: "Processando",
    variant: "outline" as const,
    icon: Loader2,
    className: "border-df-info/30 text-df-info bg-df-info/10",
  },
  COMPLETED: {
    label: "Concluído",
    variant: "outline" as const,
    icon: CheckCircle2,
    className: "border-df-success/30 text-df-success bg-df-success/10",
  },
  FAILED: {
    label: "Falhou",
    variant: "outline" as const,
    icon: XCircle,
    className: "border-df-error/30 text-df-error bg-df-error/10",
  },
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function UploadsTable({ data, isLoading }: UploadsTableProps) {
  return (
    <div className="rounded-xl bg-df-bg-secondary border border-df-surface/20 overflow-y-scroll">
      <div className="p-5 border-b border-df-surface/15">
        <h3 className="text-df-white font-semibold text-sm">
          Uploads Recentes
        </h3>
        <p className="text-df-muted text-xs mt-0.5">
          Acompanhe o status dos seus arquivos processados
        </p>
      </div>

      <ScrollArea className="max-h-[400px]">
        {isLoading ? (
          <div className="p-5 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-lg bg-df-surface/20" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48 bg-df-surface/20" />
                  <Skeleton className="h-3 w-32 bg-df-surface/20" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full bg-df-surface/20" />
              </div>
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-df-surface/10">
            {data.map((upload, index) => {
              const config = statusConfig[upload.status];
              const StatusIcon = config.icon;
              const percentage = upload.progress?.percentage ?? 0;

              return (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center flex-wrap gap-4 p-4 hover:bg-df-surface/5 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-df-accent/10 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5 text-df-accent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-[153px]">
                    <p className="text-df-text text-sm font-medium truncate">
                      {upload.filename}
                    </p>
                    <p className="text-df-muted text-xs">
                      {formatDate(upload.createdAt)}
                    </p>
                    {(upload.status === "COMPLETED" || upload.status === "FAILED") &&
                      upload.progress?.totalRows != null && (
                        <div className="flex items-center gap-2 mt-1">
                          {upload.progress.successRows != null &&
                            upload.progress.successRows > 0 && (
                              <span className="text-df-success text-xs">
                                {upload.progress.successRows} importados
                              </span>
                            )}
                          {upload.progress.errorRows != null &&
                            upload.progress.errorRows > 0 && (
                              <span className="text-df-error text-xs flex items-center gap-0.5">
                                <AlertTriangle className="w-3 h-3" />
                                {upload.progress.errorRows} com erro
                              </span>
                            )}
                        </div>
                      )}
                    {upload.status === "PROCESSING" && (
                      <Progress
                        value={percentage}
                        className="mt-2 h-1.5 bg-df-surface/20 [&>div]:bg-df-accent"
                      />
                    )}
                  </div>

                  {/* Status */}
                  <Badge
                    variant={config.variant}
                    className={`${config.className} gap-1.5 text-xs font-medium shrink-0`}
                  >
                    <StatusIcon
                      className={`w-3 h-3 ${
                        upload.status === "PROCESSING" ? "animate-spin" : ""
                      }`}
                    />
                    {config.label}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileSpreadsheet className="w-10 h-10 text-df-muted/30 mb-3" />
            <p className="text-df-muted text-sm">Nenhum upload encontrado</p>
            <p className="text-df-muted/60 text-xs mt-1">
              Faça seu primeiro upload de CSV
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
