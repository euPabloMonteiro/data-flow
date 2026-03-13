import { csvParser } from "../../../lib/csvParser";
import { saleSchema } from "@dataflow/types";
import { SaleRepository } from "../repositories/sale.repository";

export class FileProcessingService {
  private saleRepository = new SaleRepository();

  async execute(filePath: string) {
    const rows = await csvParser(filePath);

    const validatedRows = rows.map((row) => {
      return saleSchema.parse(row);
    });

    await this.saleRepository.createMany(validatedRows);

    return {
      processed: validatedRows.length,
    };
  }
}
