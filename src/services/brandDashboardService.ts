import { getData } from "./services";
import type {
  BrandDashboardApiResponse,
  BrandDashboardResponse,
  BrandStat,
} from "@/types/brandDashTypes";

interface BrandDashboardParams {
  brandId?: string | number;
  brandSlug?: string;
}

type BrandDashboardRaw = BrandDashboardApiResponse | BrandDashboardResponse;
type RecentOrder = NonNullable<BrandDashboardResponse["recent_orders"]>[number];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toNumber = (value: unknown): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isNaN(numericValue) ? undefined : numericValue;
};

const parsePercent = (value: unknown): number | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return value;
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().replace("%", "");
  if (!cleaned) return undefined;
  const numericValue = Number(cleaned);
  return Number.isNaN(numericValue) ? undefined : numericValue;
};

const toBrandStat = (value: unknown, growth?: unknown): BrandStat | undefined => {
  if (value === undefined || value === null) return undefined;
  if (isRecord(value) && "value" in value) {
    const statValue = toNumber(value.value);
    if (statValue === undefined) return undefined;
    const statChange = toNumber((value as BrandStat).change_percent);
    return statChange === undefined
      ? { value: statValue }
      : { value: statValue, change_percent: statChange };
  }
  const statValue = toNumber(value);
  if (statValue === undefined) return undefined;
  const statChange = parsePercent(growth);
  return statChange === undefined
    ? { value: statValue }
    : { value: statValue, change_percent: statChange };
};

const normalizeTopProducts = (source: unknown) => {
  if (Array.isArray(source)) {
    return source
      .map((item) => {
        if (!isRecord(item)) return null;
        const name = typeof item.name === "string" ? item.name : "";
        const sales = toNumber(item.sales ?? item.value);
        if (!name || sales === undefined) return null;
        return { name, sales };
      })
      .filter(
        (item): item is { name: string; sales: number } => item !== null
      );
  }
  if (isRecord(source)) {
    return Object.entries(source)
      .map(([name, value]) => {
        const sales = toNumber(value);
        return sales === undefined ? null : { name, sales };
      })
      .filter(
        (item): item is { name: string; sales: number } => item !== null
      );
  }
  return [];
};

const normalizeRevenueByCategory = (source: unknown) => {
  if (Array.isArray(source)) {
    return source
      .map((item) => {
        if (!isRecord(item)) return null;
        const name = typeof item.name === "string" ? item.name : "";
        const revenue = toNumber(item.revenue ?? item.value);
        if (!name || revenue === undefined) return null;
        return { name, revenue };
      })
      .filter(
        (item): item is { name: string; revenue: number } => item !== null
      );
  }
  if (isRecord(source)) {
    return Object.entries(source)
      .map(([name, value]) => {
        const revenue = toNumber(value);
        return revenue === undefined ? null : { name, revenue };
      })
      .filter(
        (item): item is { name: string; revenue: number } => item !== null
      );
  }
  return [];
};

const normalizeCategoryDistribution = (source: unknown) => {
  if (Array.isArray(source)) {
    return source
      .map((item) => {
        if (!isRecord(item)) return null;
        const name = typeof item.name === "string" ? item.name : "";
        const value = toNumber(item.value);
        if (!name || value === undefined) return null;
        const color =
          typeof item.color === "string" && item.color ? item.color : undefined;
        return { name, value, ...(color ? { color } : {}) };
      })
      .filter(
        (
          item
        ): item is { name: string; value: number; color?: string } =>
          item !== null
      );
  }
  if (isRecord(source)) {
    return Object.entries(source)
      .map(([name, value]) => {
        const count = toNumber(value);
        return count === undefined ? null : { name, value: count };
      })
      .filter(
        (
          item
        ): item is { name: string; value: number; color?: string } =>
          item !== null
      );
  }
  return [];
};

const mapStatusVariant = (
  color?: string
): BrandDashboardResponse["recent_orders"][number]["status_variant"] => {
  if (!color) return undefined;
  switch (color.toLowerCase()) {
    case "green":
    case "success":
      return "success";
    case "orange":
    case "amber":
    case "yellow":
    case "warning":
      return "warning";
    case "blue":
    case "purple":
    case "info":
      return "info";
    default:
      return "neutral";
  }
};

const normalizeRecentOrders = (source: unknown): RecentOrder[] => {
  if (!Array.isArray(source)) return [];
  return source
    .map((item) => {
      if (!isRecord(item)) return null;
      const id =
        (typeof item.tracking_code === "string" && item.tracking_code) ||
        (typeof item.id === "string" && item.id) ||
        (typeof item.id === "number" ? String(item.id) : "");
      const date =
        (typeof item.date === "string" && item.date) ||
        (typeof item.date_full === "string" && item.date_full) ||
        "-";
      const quantity = toNumber(item.items_count ?? item.quantity ?? item.items);
      const amount = toNumber(item.total ?? item.amount);
      const status =
        (typeof item.status_text === "string" && item.status_text) ||
        (typeof item.order_status === "string" && item.order_status) ||
        (typeof item.status === "string" && item.status) ||
        (typeof item.payment_status === "string" && item.payment_status) ||
        "-";
      const statusVariant =
        (item.status_variant as RecentOrder["status_variant"]) ??
        mapStatusVariant(typeof item.status_color === "string" ? item.status_color : undefined);

      return {
        id,
        date,
        quantity: quantity ?? 0,
        amount: amount ?? 0,
        status,
        status_variant: statusVariant,
      };
    })
    .filter((item): item is RecentOrder => item !== null);
};

const normalizeBrandDashboard = (raw: BrandDashboardRaw): BrandDashboardResponse => {
  const rawData = raw as BrandDashboardApiResponse & BrandDashboardResponse;
  const brand = isRecord(rawData.brand)
    ? {
        name:
          typeof rawData.brand.name === "string" ? rawData.brand.name : undefined,
        avatar_url:
          typeof rawData.brand.avatar_url === "string"
            ? rawData.brand.avatar_url
            : undefined,
        subtitle:
          typeof rawData.brand.subtitle === "string"
            ? rawData.brand.subtitle
            : undefined,
      }
    : undefined;

  const statsSource = isRecord(rawData.stats) ? rawData.stats : undefined;
  const stats = statsSource
    ? {
        conversion_rate: toBrandStat(
          statsSource.conversion_rate,
          statsSource.conversion_growth
        ),
        active_products: toBrandStat(
          statsSource.active_products,
          statsSource.active_products_growth
        ),
        new_orders: toBrandStat(
          statsSource.new_orders_today ?? statsSource.new_orders,
          statsSource.new_orders_growth
        ),
        today_revenue: toBrandStat(
          statsSource.today_revenue,
          statsSource.today_revenue_growth
        ),
      }
    : undefined;

  const chartsSource = isRecord(rawData.charts) ? rawData.charts : undefined;
  const topProductsSource = rawData.top_products ?? chartsSource?.top_products;
  const revenueByCategorySource =
    rawData.category_revenue ?? chartsSource?.revenue_by_category;
  const categoryDistributionSource =
    rawData.category_distribution ?? chartsSource?.category_distribution;

  const topProducts = normalizeTopProducts(topProductsSource);
  const revenueByCategory = normalizeRevenueByCategory(revenueByCategorySource);
  const categoryDistribution = normalizeCategoryDistribution(
    categoryDistributionSource
  );

  const charts =
    topProducts.length || revenueByCategory.length || categoryDistribution.length
      ? {
          top_products: topProducts,
          revenue_by_category: revenueByCategory,
          category_distribution: categoryDistribution,
        }
      : undefined;

  const recentOrders = normalizeRecentOrders(rawData.recent_orders);

  const summarySource = isRecord(rawData.summary) ? rawData.summary : undefined;
  const summary = summarySource
    ? {
        total_orders: toNumber(summarySource.total_orders),
        total_orders_change_percent: parsePercent(
          summarySource.total_orders_growth ??
            summarySource.total_orders_change_percent
        ),
        total_visitors: toNumber(summarySource.total_visitors),
        total_visitors_change_percent: parsePercent(
          summarySource.total_visitors_growth ??
            summarySource.total_visitors_change_percent
        ),
        pending_orders: toNumber(summarySource.pending_orders),
        pending_orders_change_percent: parsePercent(
          summarySource.pending_growth ??
            summarySource.pending_orders_change_percent
        ),
        total_revenue: toNumber(summarySource.total_revenue),
        total_revenue_change_percent: parsePercent(
          summarySource.revenue_growth ??
            summarySource.total_revenue_change_percent
        ),
      }
    : undefined;

  return {
    brand,
    stats,
    charts,
    recent_orders: recentOrders,
    summary,
  };
};

export const fetchBrandDashboard = async ({
  brandId,
  brandSlug,
}: BrandDashboardParams = {}): Promise<BrandDashboardResponse> => {
  const params: Record<string, string> = {};
  if (brandId !== undefined && brandId !== null) params.brand_id = String(brandId);
  if (brandSlug) params.brand_slug = brandSlug;

  try {
    const data = await getData({
      endPoint: "/api/brand/dashboard",
      params: Object.keys(params).length ? params : undefined,
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache", Accept: "*/*" },
    });

    return normalizeBrandDashboard(data as BrandDashboardRaw);
  } catch (error) {
    throw error;
  }
};
