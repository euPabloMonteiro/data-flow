import { z } from "@dataflow/config";

export const revenueByCountrySchema = z.object({
  country: z.string(),
  total: z.number(),
});

export const topProductSchema = z.object({
  product: z.string(),
  quantity: z.number(),
});

export const salesPerDaySchema = z.object({
  date: z.string(),
  total: z.number(),
});

export const categoryPerformanceSchema = z.object({
  category: z.string(),
  total: z.number(),
});

export const analyticsResponseSchema = z.object({
  revenueByCountry: z.array(revenueByCountrySchema),
  topProducts: z.array(topProductSchema),
  salesPerDay: z.array(salesPerDaySchema),
  categoryPerformance: z.array(categoryPerformanceSchema),
});

export type AnalyticsResponseType = z.infer<typeof analyticsResponseSchema>;
