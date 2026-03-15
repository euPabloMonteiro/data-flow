import {
  redisConnection,
  Worker,
  Job,
  FileProcessingJob,
} from "@dataflow/queue";
import { FileProcessingService } from "./modules/fileProcessing/services/fileProcessing.service";

const worker = new Worker<FileProcessingJob>(
  "file-processing",
  async (job: Job<FileProcessingJob>) => {
    console.log("Processing job", job.data);

    const filePath = job.data.path;
    const service = new FileProcessingService();
    const result = await service.execute(filePath);

    console.log("Rows processed: ", result.processed);
  },
  {
    connection: redisConnection,
  },
);

console.log("Worker started");
