import { api } from "@/services/api";
import type { AnalyticsResponseType } from "@dataflow/types";

export async function getAnalytics(): Promise<AnalyticsResponseType> {
  const { data } = await api.get<AnalyticsResponseType>("/analytics");
  return data;
}
