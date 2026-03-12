import { Queue } from "bullmq";

interface UploadJob {
  filename: string;
  path: string;
}

export class UploadQueue {
  private queue: Queue<UploadJob>;

  constructor() {
    this.queue = new Queue("file-processing", {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }

  async addFileProcessingJob(jobData: UploadJob) {
    return this.queue.add("file-processing", jobData);
  }
}
