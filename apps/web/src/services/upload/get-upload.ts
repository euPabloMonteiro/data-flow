import { api } from "@/lib/api/client";
import { UploadResponseDTO } from "@dataflow/types";

export async function getUpload(id: string): Promise<UploadResponseDTO> {
  const response = await api.get(`/uploads/${id}`);
  return response.data;
}
