import { prisma } from "@dataflow/database";
import { SalesRowType } from "../schemas/sales.schema";

export class SaleRepository {
  async createMany(rows: SalesRowType[]) {
    const data = rows.map((row) => ({
      date: new Date(row.date),
      product: row.product,
      category: row.category,
      price: row.price,
      quantity: row.quantity,
      country: row.customer_country,
      total: row.price * row.quantity,
    }));

    await prisma.sale.createMany({
      data,
    });
  }
}
