import "@dataflow/config";

import { Worker } from "bullmq";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log("Processing job", job.id);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  },
);

console.log("Worker started");
