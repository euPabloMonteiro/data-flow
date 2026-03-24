import { getRedis, Worker, Job, FileProcessingJob } from "@dataflow/queue";
import { createLogger } from "@dataflow/logger";
import { UploadStatus } from "@dataflow/database";

import { FileProcessingService } from "./modules/fileProcessing/services/fileProcessing.service";
import { UploadRepository } from "./modules/fileProcessing/repositories/upload.repository";

const logger = createLogger("worker");
const uploadRepository = new UploadRepository();

const worker = new Worker<FileProcessingJob>(
  "file-processing",
  async (job: Job<FileProcessingJob>) => {
    const uploadId = job.data.uploadId;
    logger.info(`Processing job ${uploadId}`);

    try {
      await uploadRepository.updateStatus(uploadId, UploadStatus.PROCESSING);
      await uploadRepository.setStartedAt(uploadId);
      const service = new FileProcessingService();
      const result = await service.execute(job.data.path, uploadId);

      await uploadRepository.markCompleted(uploadId);

      logger.info(result, "Processing completed");
    } catch (error) {
      await uploadRepository.markFailed(uploadId);
      logger.error(error, "Processing failed");
      throw error;
    }
  },
  {
    connection: getRedis(),
  },
);

logger.info("Worker started");
