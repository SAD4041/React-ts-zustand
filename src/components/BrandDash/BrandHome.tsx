import { useEffect, useMemo, useState } from "react";
import { DollarSign, Eye, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { StatCard } from "../ui/statCard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
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
import { fetchBrandDashboard } from "@/services/brandDashboardService";
import type { BrandDashboardResponse } from "@/types/brandDashTypes";
import { toPersianDigits } from "@/utils/PersianDigits";
import { formatPrice } from "@/utils/toLocalPrice";

interface BrandHomeProps {
  brandId?: string | number;
  brandSlug?: string;
}

const pieFallbackColors = ["#7C3AED", "#F97316", "#9CA3AF"];
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

const formatAxisNumber = (value: TooltipValue): string => formatTooltipNumber(value);

const getStatusClass = (variant?: "success" | "warning" | "info" | "neutral") => {
  switch (variant) {
    case "success":
      return "bg-green-500";
    case "warning":
      return "bg-amber-500";
    case "info":
      return "bg-sky-500";
    default:
      return "bg-slate-400";
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
    if (!source.length) return pieFallbackColors;
    return source.map((item, index) => item.color ?? pieFallbackColors[index % pieFallbackColors.length]);
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div dir="rtl" className="container mx-auto px-4 py-12 text-center text-destructive">
        {error}
      </div>
    );
  }

  const brandName = data?.brand?.name ?? "-";
  const brandSubtitle = data?.brand?.subtitle ?? "آمار و اطلاعات کلی برند";

  const topProducts = data?.charts?.top_products ?? [];
  const revenueByCategory = data?.charts?.revenue_by_category ?? [];
  const categoryDistribution = data?.charts?.category_distribution ?? [];
  const recentOrders = data?.recent_orders ?? [];
  const summary = data?.summary ?? {};

  return (
    <div dir="rtl" className="w-full bg-white font-vazirmatn">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {data?.brand?.avatar_url ? (
              <img
                src={data.brand.avatar_url}
                alt={brandName}
                className="w-12 h-12 rounded-full object-cover border"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                {brandName.slice(0, 1)}
              </div>
            )}
          </div>
          <div>
            <p className="text-muted-foreground text-sm mt-1">{brandSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="فروش امروز"
          value={formatToman(data?.stats?.today_revenue?.value)}
          icon={DollarSign}
          iconColor="#22C55E"
          trend={
            data?.stats?.today_revenue?.change_percent !== undefined
              ? {
                  value: formatPercent(Math.abs(data.stats.today_revenue.change_percent)),
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
                  value: formatPercent(Math.abs(data.stats.new_orders.change_percent)),
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
                  value: formatPercent(Math.abs(data.stats.active_products.change_percent)),
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
                  value: formatPercent(Math.abs(data.stats.conversion_rate.change_percent)),
                  isPositive: data.stats.conversion_rate.change_percent >= 0,
                }
              : undefined
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6 text-base font-semibold">پرفروش ترین محصولات</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => formatAxisNumber(value)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatTooltipNumber(value)} />
              <Bar dataKey="sales" fill="#FB923C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-base font-semibold">درآمد به تفکیک دسته بندی</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => formatAxisNumber(value)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatTooltipPrice(value)} />
              <Bar dataKey="revenue" fill="#14B8A6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-6 text-base font-semibold">سفارشات اخیر</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 text-right font-medium">شماره سفارش</th>
                  <th className="py-3 text-right font-medium">تاریخ</th>
                  <th className="py-3 text-right font-medium">تعداد</th>
                  <th className="py-3 text-right font-medium">مبلغ (تومان)</th>
                  <th className="py-3 text-right font-medium">وضعیت سفارش</th>
                  <th className="py-3 text-right font-medium">جزئیات</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{order.id}</td>
                    <td className="py-3 text-muted-foreground">{order.date}</td>
                    <td className="py-3">{formatCount(order.quantity)}</td>
                    <td className="py-3">{formatPrice(order.amount)}</td>
                    <td className="py-3">
                      <Badge className={`${getStatusClass(order.status_variant)} text-white border-0`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <button className="text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {!recentOrders.length && (
                  <tr>
                    <td className="py-6 text-center text-muted-foreground" colSpan={6}>
                      داده ای برای نمایش وجود ندارد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-base font-semibold">توزیع دسته بندی ها</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${entry.name}-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${formatTooltipNumber(value)}٪`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            {categoryDistribution.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                  <span>{item.name}</span>
                </div>
                <span>{formatPercent(item.value)}</span>
              </div>
            ))}
            {!categoryDistribution.length && (
              <div className="text-center text-muted-foreground">داده ای برای نمایش وجود ندارد</div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground text-sm">تعداد سفارشات</p>
          <p className="text-2xl font-bold mt-2">{formatCount(summary.total_orders)}</p>
          {summary.total_orders_change_percent !== undefined && (
            <p
              className={`text-xs mt-2 ${summary.total_orders_change_percent >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatPercent(Math.abs(summary.total_orders_change_percent))}
            </p>
          )}
        </Card>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground text-sm">تعداد بازدیدکنندگان</p>
          <p className="text-2xl font-bold mt-2">{formatCount(summary.total_visitors)}</p>
          {summary.total_visitors_change_percent !== undefined && (
            <p
              className={`text-xs mt-2 ${summary.total_visitors_change_percent >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatPercent(Math.abs(summary.total_visitors_change_percent))}
            </p>
          )}
        </Card>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground text-sm">درآمد کل</p>
          <p className="text-2xl font-bold mt-2">{formatToman(summary.total_revenue)}</p>
          {summary.total_revenue_change_percent !== undefined && (
            <p
              className={`text-xs mt-2 ${summary.total_revenue_change_percent >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatPercent(Math.abs(summary.total_revenue_change_percent))}
            </p>
          )}
        </Card>
      </div>
      </div>
    </div>
  );
}
