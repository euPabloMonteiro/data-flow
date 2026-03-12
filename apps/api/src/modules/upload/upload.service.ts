import { UploadQueue } from "./upload.queue";

export class UploadFileService {
  private queue: UploadQueue;

  constructor() {
    this.queue = new UploadQueue();
  }

  async execute(file: Express.Multer.File) {
    const job = await this.queue.addFileProcessingJob({
      filename: file.filename,
      path: file.path,
    });

    return {
      message: "File uploaded",
      jobId: job.id,
    };
  }
}
