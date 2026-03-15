import { createCsvStream } from "../../../lib/csvParser";
import { saleSchema } from "@dataflow/types";
import { SaleRepository } from "../repositories/sale.repository";

const BATCH_SIZE = 500;

export class FileProcessingService {
  private saleRepository = new SaleRepository();

  async execute(filePath: string) {
    const stream = createCsvStream(filePath);

    let batch: any[] = [];
    let processed = 0;

    for await (const row of stream) {
      try {
        const validated = saleSchema.parse(row);

        batch.push(validated);

        if (batch.length >= BATCH_SIZE) {
          await this.saleRepository.createMany(batch);
          processed += batch.length;
          batch = [];
        }
      } catch (error) {
        console.error("Error processing row:", error);
      }
    }

    if (batch.length > 0) {
      await this.saleRepository.createMany(batch);
      processed += batch.length;
    }

    return {
      processed,
    };
  }
}
