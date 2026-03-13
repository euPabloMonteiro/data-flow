import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { AnalyticsResponseType } from "@dataflow/types";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await api.get<AnalyticsResponseType>("/analytics");
      return data;
    },
  });
}
