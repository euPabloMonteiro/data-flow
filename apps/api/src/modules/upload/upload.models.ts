export interface CreateUploadRequest {
  file: unknown;
}

export interface CreateUploadResponse {
  uploadId: string;
  jobId: string;
}

export interface UploadProgressDTO {
  totalRows?: number | null;
  processedRows?: number | null;
  successRows?: number | null;
  errorRows?: number | null;
  percentage?: number | null;
}

export interface UploadResponseDTO {
  id: string;
  filename: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "PARTIAL" | "FAILED";
  progress: UploadProgressDTO;
  processedAt?: string | null;
  createdAt: string;
}

export interface UploadErrorsResponseDTO {
  uploadId: string;
  totalErrors: number;
  errors: UploadErrorDTO[];
}

export interface UploadErrorDTO {
  row: number;
  errors: string[];
}
