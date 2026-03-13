import { AnalyticsRepository } from "./analytics.repository";

export class AnalyticsService {
  private repo = new AnalyticsRepository();

  async execute(): Promise<any> {

    const [revenueByCountry, topProducts, salesPerDay, categoryPerformance] =
      await Promise.all([
        this.repo.revenueByCountry(),
        this.repo.topProducts(),
        this.repo.salesPerDay(),
        this.repo.categoryPerformance(),
      ]);

    return {
      revenueByCountry,
      topProducts,
      salesPerDay,
      categoryPerformance,
    };
  }
}
