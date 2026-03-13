import { prisma } from "@dataflow/database";

export class AnalyticsRepository {
  revenueByCountry(): Promise<any> {
    return prisma.sale.groupBy({
      by: ["country"],
      _sum: {
        total: true,
      },
    });
  }

  topProducts(): Promise<any> {
    return prisma.sale.groupBy({
      by: ["product"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });
  }

  salesPerDay(): Promise<any> {
    return prisma.sale.groupBy({
      by: ["date"],
      _sum: {
        total: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  categoryPerformance(): Promise<any> {
    return prisma.sale.groupBy({
      by: ["category"],
      _sum: {
        total: true,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
    });
  }
}
