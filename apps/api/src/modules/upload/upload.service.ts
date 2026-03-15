import { fileProcessingQueue } from "@dataflow/queue";
import path from "path";

export class UploadFileService {
  async execute(file: Express.Multer.File) {
    const absolutePath = path.resolve(file.path);

    const job = await fileProcessingQueue.add("fileProcessingJob", {
      filename: file.filename,
      path: absolutePath,
    });

    return {
      message: "File uploaded",
      jobId: job.id,
    };
  }
}
