"use client";

import { useAnalytics } from "@/features/dashboard/hooks/use-analytics";
import { useUploads } from "@/features/dashboard/hooks/use-uploads";
import { KPICards } from "@/features/dashboard/components/kpi-cards";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { SalesChart } from "@/features/dashboard/components/sales-chart";
import { TopProductsChart } from "@/features/dashboard/components/top-products-chart";
import { CategoryChart } from "@/features/dashboard/components/category-chart";
import { UploadsTable } from "@/features/dashboard/components/uploads-table";
import { UploadModal } from "@/features/dashboard/components/upload-modal";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const {
    data: analytics,
    isLoading: analyticsLoading,
  } = useAnalytics();

  const {
    data: uploads,
    isLoading: uploadsLoading,
  } = useUploads();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-df-white text-2xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-df-muted text-sm mt-0.5">
            Visão geral de processamento e métricas de vendas
          </p>
        </div>
        <UploadModal />
      </motion.div>

      {/* KPI Cards */}
      <KPICards
        totalRevenue={analytics?.totalRevenue}
        totalSales={analytics?.totalSales}
        uploadsCount={uploads?.length}
        isLoading={analyticsLoading || uploadsLoading}
      />

      {/* Charts - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <SalesChart data={analytics?.salesPerDay} isLoading={analyticsLoading} />
        <RevenueChart
          data={analytics?.revenueByCountry}
          isLoading={analyticsLoading}
        />
      </div>

      {/* Charts - Row 2 + Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <TopProductsChart
          data={analytics?.topProducts}
          isLoading={analyticsLoading}
        />
        <CategoryChart
          data={analytics?.categoryPerformance}
          isLoading={analyticsLoading}
        />
        <UploadsTable data={uploads} isLoading={uploadsLoading} />
      </div>
    </div>
  );
}
