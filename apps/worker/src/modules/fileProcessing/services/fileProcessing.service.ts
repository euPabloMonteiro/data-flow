import { csvParser } from "../../../lib/csvParser";
import { salesSchema } from "../schemas/sales.schema";
import { SaleRepository } from "../repositories/sale.repository";

export class FileProcessingService {
  private saleRepository = new SaleRepository();

  async execute(filePath: string) {
    const rows = await csvParser(filePath);

    const validatedRows = rows.map((row) => {
      return salesSchema.parse(row);
    });

    await this.saleRepository.createMany(validatedRows);

    return {
      processed: validatedRows.length,
    };
  }
}
