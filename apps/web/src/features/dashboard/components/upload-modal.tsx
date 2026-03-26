"use client";

import { useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, X, CheckCircle2 } from "lucide-react";
import { createUpload } from "@/services/upload/create-upload";
import { useUpload } from "@/features/upload/hooks/use-upload";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function UploadModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();
  const { data: uploadData } = useUpload(uploadId ?? "");

  const percentage = uploadData?.progress?.percentage ?? 0;
  const isCompleted = uploadData?.status === "COMPLETED";
  const isFailed = uploadData?.status === "FAILED";

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    const isValidExtension = droppedFile.name.toLowerCase().endsWith(".csv");
    const isValidMime =
      droppedFile.type === "text/csv" ||
      droppedFile.type === "application/vnd.ms-excel";

    if (isValidExtension && isValidMime) {
      setFile(droppedFile);
    } else {
      toast.error("Apenas arquivos CSV são aceitos.");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await createUpload(file);
      setUploadId(response.uploadId);
      toast.success("Upload iniciado! Acompanhe o progresso.");
    } catch {
      toast.error("Erro ao fazer upload. Tente novamente.");
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadId(null);
    setIsUploading(false);
    queryClient.invalidateQueries({ queryKey: ["uploads"] });
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-df-accent hover:bg-df-accent-hover text-white rounded-lg cursor-pointer gap-2 transition-all hover:shadow-lg hover:shadow-df-accent/25">
          <Upload className="w-4 h-4" />
          Novo Upload
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] sm:w-[450px] bg-df-bg-primary border-l border-df-surface/20 px-4"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-df-white text-lg">
            Upload de CSV
          </SheetTitle>
          <SheetDescription className="text-df-muted text-sm">
            Arraste um arquivo CSV ou selecione do seu computador para iniciar o
            processamento.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!uploadId ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-df-accent bg-df-accent/10"
                      : file
                        ? "border-df-success/40 bg-df-success/5"
                        : "border-df-surface/40 bg-df-bg-secondary/50 hover:border-df-accent/40 hover:bg-df-accent/5"
                  }`}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        file ? "bg-df-success/10" : "bg-df-accent/10"
                      }`}
                    >
                      <FileUp
                        className={`w-7 h-7 ${
                          file ? "text-df-success" : "text-df-accent"
                        }`}
                      />
                    </div>

                    {file ? (
                      <>
                        <p className="text-df-white text-sm font-medium">
                          {file.name}
                        </p>
                        <p className="text-df-muted text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="text-df-muted hover:text-df-error text-xs flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Remover
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-df-text text-sm font-medium">
                          {isDragging
                            ? "Solte o arquivo aqui"
                            : "Arraste o arquivo CSV aqui"}
                        </p>
                        <p className="text-df-muted text-xs">
                          ou clique para selecionar
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Upload button */}
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full mt-4 bg-df-accent hover:bg-df-accent-hover text-white h-11 rounded-lg cursor-pointer transition-all disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Iniciar Upload
                    </span>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Progress display */}
                <div className="rounded-xl bg-df-bg-secondary border border-df-surface/20 p-6 text-center">
                  {isCompleted ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-df-success/10 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-df-success" />
                      </div>
                      <p className="text-df-white font-semibold">
                        Processamento concluído!
                      </p>
                      <p className="text-df-muted text-sm">
                        {uploadData?.progress.processedRows} linhas processadas
                      </p>
                    </div>
                  ) : isFailed ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-df-error/10 flex items-center justify-center">
                        <X className="w-8 h-8 text-df-error" />
                      </div>
                      <p className="text-df-white font-semibold">
                        Processamento falhou
                      </p>
                      <p className="text-df-muted text-sm">
                        Verifique o arquivo e tente novamente
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative w-24 h-24 mx-auto">
                        <svg
                          className="w-24 h-24 -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#334155"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-df-white font-bold text-lg">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                      <p className="text-df-text text-sm font-medium">
                        Processando...
                      </p>
                      <p className="text-df-muted text-xs">
                        {uploadData?.progress.processedRows ?? 0} /{" "}
                        {uploadData?.progress.totalRows ?? "?"} linhas
                      </p>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                {(isCompleted || isFailed) && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 border-df-surface/40 text-df-text hover:bg-df-surface/15 cursor-pointer"
                    >
                      Novo Upload
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="flex-1 bg-df-accent hover:bg-df-accent-hover text-white cursor-pointer"
                    >
                      Fechar
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
