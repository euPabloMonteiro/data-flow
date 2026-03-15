import { fileProcessingQueue } from "@dataflow/queue";

export class UploadFileService {
  async execute(file: Express.Multer.File) {
    const job = await fileProcessingQueue.add("fileProcessingJob", {
      filename: file.filename,
      path: file.path,
    });

    return {
      message: "File uploaded",
      jobId: job.id,
    };
  }
}
