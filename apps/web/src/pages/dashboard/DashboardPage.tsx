import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import { KpiCard } from "@/features/analytics/components/KpiCard";

export function DashboardPage() {
  const { data, isLoading } = useAnalytics();

  if (isLoading) return <p>Loading...</p>;

  const totalRevenue =
    data?.revenueByCountry.reduce((acc, item) => acc + item.total, 0) ?? 0;

  const totalOrders =
    data?.salesPerDay.reduce((acc, item) => acc + item.total, 0) ?? 0;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Sales Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value={totalRevenue} />
        <KpiCard title="Total Orders" value={totalOrders} />
        <KpiCard title="Countries" value={data?.revenueByCountry.length ?? 0} />
        <KpiCard title="Products" value={data?.topProducts.length ?? 0} />
      </div>
    </div>
  );
}
