import { api } from "@/lib/api/client";
import { CreateUploadResponseDTO } from "@dataflow/types";

export async function createUpload(
  file: File,
): Promise<CreateUploadResponseDTO> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
