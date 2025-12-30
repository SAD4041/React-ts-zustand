export interface BrandStat {
  value: number;
  change_percent?: number;
}

export interface BrandDashboardResponse {
  brand?: {
    name?: string;
    avatar_url?: string;
    subtitle?: string;
  };
  stats?: {
    conversion_rate?: BrandStat;
    active_products?: BrandStat;
    new_orders?: BrandStat;
    today_revenue?: BrandStat;
  };
  charts?: {
    top_products?: Array<{ name: string; sales: number }>;
    revenue_by_category?: Array<{ name: string; revenue: number }>;
    category_distribution?: Array<{ name: string; value: number; color?: string }>;
  };
  recent_orders?: Array<{
    id: string;
    date: string;
    quantity: number;
    amount: number;
    status: string;
    status_variant?: "success" | "warning" | "info" | "neutral";
  }>;
  summary?: {
    total_orders?: number;
    total_orders_change_percent?: number;
    total_visitors?: number;
    total_visitors_change_percent?: number;
    total_revenue?: number;
    total_revenue_change_percent?: number;
  };
}
