import "@dataflow/config";

import { Worker } from "bullmq";
import path from "path";
import { csvParser } from "./lib/csvParser";
import { salesSchema } from "./modules/fileProcessing/schemas/sales.schema";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log("Processing job", job.data);

    const filePath = path.resolve(__dirname, "../../api", job.data.path);
    const rows = await csvParser(filePath);

    console.log("Rows parsed", rows.length);

    const validateRows = rows.map((row) => salesSchema.parse(row));

    console.log("Rows validated", validateRows.length);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  },
);

console.log("Worker started");
