import { env } from "@dataflow/config";

import { Worker } from "bullmq";
import path from "path";
import { FileProcessingService } from "./modules/fileProcessing/services/fileProcessing.service";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log("Processing job", job.data);

    const filePath = path.resolve(__dirname, "../../api", job.data.path);

    const service = new FileProcessingService();
    const result = await service.execute(filePath);

    console.log("Rows processed: ", result.processed);
  },
  {
    connection: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  },
);

console.log("Worker started");
