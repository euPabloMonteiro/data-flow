import { Queue } from "bullmq";
import { redisConnection } from "../connection";
import { FileProcessingJob } from "../jobs/fileProcessing.job";

export const fileProcessingQueue = new Queue<FileProcessingJob>(
  "file-processing",
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
      removeOnComplete: true,
    },
  },
);
