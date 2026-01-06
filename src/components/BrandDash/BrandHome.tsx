import { useEffect, useMemo, useState } from "react";
import { DollarSign, Eye, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { StatCard } from "../ui/statCard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { fetchBrandDashboard } from "@/services/brandDashboardService";
import type { BrandDashboardResponse } from "@/types/brandDashTypes";
import { toPersianDigits } from "@/utils/PersianDigits";
import { formatPrice } from "@/utils/toLocalPrice";

interface BrandHomeProps {
  brandId?: string | number;
  brandSlug?: string;
}

// const pieFallbackColors = ["#7C3AED", "#F97316", "#9CA3AF"];
const categoryColors = ["#7C3AED", "#F97316", "#4B5563", "#14B8A6"];

type TooltipValue = number | string | readonly (number | string)[] | undefined;

const formatCount = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return toPersianDigits(value.toLocaleString("en-US"));
};

const formatPercent = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return `${toPersianDigits(value.toString())}٪`;
};

const formatToman = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return `${formatPrice(value)} تومان`;
};

const formatTooltipNumber = (value: TooltipValue): string => {
  if (value === undefined || value === null) return "-";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return "-";
  return toPersianDigits(numericValue.toLocaleString("en-US"));
};

const formatTooltipPrice = (value: TooltipValue): string => {
  if (value === undefined || value === null) return "-";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return "-";
  return formatPrice(numericValue);
};

const formatAxisNumber = (value: TooltipValue): string =>
  formatTooltipNumber(value);

const getStatusClass = (
  variant?: "success" | "warning" | "info" | "neutral"
) => {
  switch (variant) {
    case "success":
      return "bg-green-500 hover:bg-green-600";
    case "warning":
      return "bg-amber-500 hover:bg-amber-600";
    case "info":
      return "bg-sky-500 hover:bg-sky-600";
    default:
      return "bg-slate-400 hover:bg-slate-500";
  }
};

export function BrandHome({ brandId, brandSlug }: BrandHomeProps) {
  const [data, setData] = useState<BrandDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchBrandDashboard({ brandId, brandSlug })
      .then((response) => {
        if (!isMounted) return;
        setData(response);
      })
      .catch((err) => {
        console.error(err);
        if (!isMounted) return;
        setError("خطا در دریافت اطلاعات داشبورد.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [brandId, brandSlug]);

  const pieColors = useMemo(() => {
    const source = data?.charts?.category_distribution ?? [];
    if (!source.length) return categoryColors;
    return source.map(
      (item, index) => item.color ?? categoryColors[index % categoryColors.length]
    );
  }, [data]);

  const OrderDetailsDialog = ({ order }: { order: any }) => {
    return (
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>جزئیات سفارش: {order.id}</DialogTitle>
          <DialogDescription>
            اطلاعات کامل سفارش در این پنجره نمایش داده می‌شود
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-muted-foreground text-xs mb-1">شماره سفارش</p>
              <p className="font-semibold text-sm">{order.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">تاریخ</p>
              <p className="font-semibold text-sm">{order.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">مبلغ</p>
              <p className="font-semibold text-sm">
                {formatToman(order.amount)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">وضعیت</p>
              <Badge className={`${getStatusClass(order.status_variant)} text-white border-0`}>
                {order.status}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="container mx-auto px-4 py-12 text-center text-destructive"
      >
        {error}
      </div>
    );
  }

  const brandName = data?.brand?.name ?? "-";
  const brandSubtitle = data?.brand?.subtitle ?? "آمار و اطلاعات کلی فروش";

  const topProducts = data?.charts?.top_products ?? [];
  const revenueByCategory = data?.charts?.revenue_by_category ?? [];
  const categoryDistribution = data?.charts?.category_distribution ?? [];
  const recentOrders = data?.recent_orders ?? [];
  const summary = data?.summary ?? {};

  return (
    <div dir="rtl" className="w-full bg-gray-50/30 font-vazirmatn min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8" dir="ltr">
          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-end">
              <h1 className="text-xl font-bold text-gray-900">{brandName}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {brandSubtitle}
              </p>
            </div>
            <div className="relative">
              {data?.brand?.avatar_url ? (
                <img
                  src={data.brand.avatar_url}
                  alt={brandName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-white shadow-sm">
                  {brandName.slice(0, 1)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="فروش امروز"
            value={formatToman(data?.stats?.today_revenue?.value)}
            icon={DollarSign}
            iconColor="#22C55E"
            trend={
              data?.stats?.today_revenue?.change_percent !== undefined
                ? {
                    value: formatPercent(
                      Math.abs(data.stats.today_revenue.change_percent)
                    ),
                    isPositive: data.stats.today_revenue.change_percent >= 0,
                  }
                : undefined
            }
          />
          <StatCard
            title="سفارشات جدید"
            value={formatCount(data?.stats?.new_orders?.value)}
            icon={ShoppingBag}
            iconColor="#38BDF8"
            trend={
              data?.stats?.new_orders?.change_percent !== undefined
                ? {
                    value: formatPercent(
                      Math.abs(data.stats.new_orders.change_percent)
                    ),
                    isPositive: data.stats.new_orders.change_percent >= 0,
                  }
                : undefined
            }
          />
          <StatCard
            title="محصولات فعال"
            value={formatCount(data?.stats?.active_products?.value)}
            icon={Package}
            iconColor="#34D399"
            trend={
              data?.stats?.active_products?.change_percent !== undefined
                ? {
                    value: formatPercent(
                      Math.abs(data.stats.active_products.change_percent)
                    ),
                    isPositive: data.stats.active_products.change_percent >= 0,
                  }
                : undefined
            }
          />
          <StatCard
            title="نرخ تبدیل"
            value={formatPercent(data?.stats?.conversion_rate?.value)}
            icon={TrendingUp}
            iconColor="#FBBF24"
            trend={
              data?.stats?.conversion_rate?.change_percent !== undefined
                ? {
                    value: formatPercent(
                      Math.abs(data.stats.conversion_rate.change_percent)
                    ),
                    isPositive: data.stats.conversion_rate.change_percent >= 0,
                  }
                : undefined
            }
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm border-gray-100">
            <h3 className="mb-8 text-base font-bold text-gray-800 text-right">
              درآمد به تفکیک دسته‌بندی
            </h3>
            <div className="h-[280px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByCategory} barSize={40}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickFormatter={(value) => formatAxisNumber(value)}
                  />
                  <Tooltip
                    cursor={{ fill: "#F3F4F6" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => formatTooltipPrice(value)}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#14B8A6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 shadow-sm border-gray-100">
            <h3 className="mb-8 text-base font-bold text-gray-800 text-right">
              پرفروش‌ترین محصولات
            </h3>
            <div className="h-[280px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} barSize={40}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickFormatter={(value) => formatAxisNumber(value)}
                  />
                  <Tooltip
                    cursor={{ fill: "#F3F4F6" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => formatTooltipNumber(value)}
                  />
                  <Bar dataKey="sales" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Third Row: Pie Chart (Right) & Table (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <Card className="p-6 lg:col-span-1 shadow-sm border-gray-100 flex flex-col">
            <h3 className="mb-6 text-base font-bold text-gray-800 text-right">
              توزیع دسته‌بندی‌ها
            </h3>
            <div className="flex-1 min-h-[250px] relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}-${index}`}
                        fill={pieColors[index % pieColors.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${formatTooltipNumber(value)}٪`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {categoryDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: pieColors[index % pieColors.length],
                    }}
                  ></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Table with Title and Reversed Columns */}
          <Card className="lg:col-span-2 overflow-hidden shadow-sm border-gray-100">
            {/* Added Title Section */}
            <div className="p-6 pb-2">
               <h3 className="text-base font-bold text-gray-800 text-right">سفارشات اخیر</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/50">
                  <tr>
                    {/* Columns reversed for standard RTL dashboard look */}
                    <th className="text-center font-bold text-gray-700 py-5">
                      شماره سفارش
                    </th>
                    <th className="text-center font-bold text-gray-700 py-5">
                      تاریخ
                    </th>
                    <th className="text-center font-bold text-gray-700 py-5">
                      تعداد
                    </th>
                    <th className="text-center font-bold text-gray-700 py-5">
                      مبلغ(تومان)
                    </th>
                    <th className="text-center font-bold text-gray-700 py-5">
                      وضعیت سفارش
                    </th>
                    <th className="text-center font-bold text-gray-700 py-5">
                      جزئیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors border-b last:border-0"
                    >
                      <td className="text-center font-medium text-gray-800 py-4" dir="ltr">
                        {order.id}
                      </td>
                      <td className="text-center text-gray-600 font-medium py-4">
                        {order.date}
                      </td>
                      <td className="text-center font-medium text-gray-700 py-4">
                        {formatCount(order.quantity)}
                      </td>
                      <td className="text-center font-medium text-gray-700 py-4">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="text-center py-4">
                        <Badge
                          className={`${getStatusClass(
                            order.status_variant
                          )} text-white border-0 px-4 py-1.5 rounded-lg text-xs font-normal`}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="text-center py-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Eye className="w-5 h-5" />
                            </Button>
                          </DialogTrigger>
                          <OrderDetailsDialog order={order} />
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                  {!recentOrders.length && (
                    <tr>
                      <td
                        className="py-8 text-center text-muted-foreground"
                        colSpan={6}
                      >
                        داده ای برای نمایش وجود ندارد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Bottom Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 text-center shadow-sm border-gray-100">
            <p className="text-gray-500 text-sm font-medium">درآمد کل</p>
            <p className="text-3xl font-bold mt-4 text-gray-900" dir="ltr">
              <span dir="rtl">{formatToman(summary.total_revenue)}</span>
            </p>
            {summary.total_revenue_change_percent !== undefined && (
              <p
                className={`text-xs mt-3 font-medium ${
                  summary.total_revenue_change_percent >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercent(Math.abs(summary.total_revenue_change_percent))}{" "}
                {summary.total_revenue_change_percent >= 0 ? "افزایش" : "کاهش"}
              </p>
            )}
          </Card>
          <Card className="p-8 text-center shadow-sm border-gray-100">
            <p className="text-gray-500 text-sm font-medium">
              تعداد بازدیدکنندگان
            </p>
            <p className="text-3xl font-bold mt-4 text-gray-900">
              {formatCount(summary.total_visitors)}
            </p>
            {summary.total_visitors_change_percent !== undefined && (
              <p
                className={`text-xs mt-3 font-medium ${
                  summary.total_visitors_change_percent >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercent(Math.abs(summary.total_visitors_change_percent))}{" "}
                {summary.total_visitors_change_percent >= 0 ? "افزایش" : "کاهش"}
              </p>
            )}
          </Card>
          <Card className="p-8 text-center shadow-sm border-gray-100">
            <p className="text-gray-500 text-sm font-medium">تعداد سفارشات</p>
            <p className="text-3xl font-bold mt-4 text-gray-900">
              {formatCount(summary.total_orders)}
            </p>
            {summary.total_orders_change_percent !== undefined && (
              <p
                className={`text-xs mt-3 font-medium ${
                  summary.total_orders_change_percent >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatPercent(Math.abs(summary.total_orders_change_percent))}{" "}
                {summary.total_orders_change_percent >= 0 ? "افزایش" : "کاهش"}
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}