import { Worker } from "bullmq";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log("Processing job", job.id);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

console.log("Worker started");
