import { prisma } from "@dataflow/database";
import { SaleType } from "@dataflow/types";

export class SaleRepository {
  async createMany(rows: SaleType[]) {
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
