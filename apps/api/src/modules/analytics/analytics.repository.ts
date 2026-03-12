import { prisma } from "@dataflow/database";

export class AnalyticsRepository {
  revenueByCountry() {
    return prisma.sale.groupBy({
      by: ["country"],
      _sum: {
        total: true,
      },
    });
  }

  topProducts() {
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

  salesPerDay() {
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

  categoryPerformance() {
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
