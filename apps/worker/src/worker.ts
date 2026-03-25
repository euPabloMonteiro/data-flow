import {
  connectRedis,
  getRedis,
  Worker,
  Job,
  FileProcessingJob,
  initializeRedisConnection,
} from "@dataflow/queue";
import { createLogger } from "@dataflow/logger";
import { UploadStatus, connectDb, initializeDatabase } from "@dataflow/database";

import { FileProcessingService } from "./modules/fileProcessing/services/fileProcessing.service";
import { UploadRepository } from "./modules/fileProcessing/repositories/upload.repository";
import { env } from "./env";

async function bootstrap() {
  initializeDatabase({
    databaseUrl: env.DATABASE_URL,
    nodeEnv: env.NODE_ENV,
  });

  initializeRedisConnection({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  });

  const logger = createLogger("worker", {
    nodeEnv: env.NODE_ENV,
    logLevel: env.LOG_LEVEL,
  });

  await Promise.all([connectDb(), connectRedis()]);

  const uploadRepository = new UploadRepository();

  new Worker<FileProcessingJob>(
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
}

bootstrap().catch((error) => {
  console.error("❌ Worker bootstrap failed", error);
  process.exit(1);
});
