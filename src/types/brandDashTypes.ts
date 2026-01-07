export interface BrandStat {
  value: number;
  change_percent?: number;
}

export interface BrandDashboardApiResponse {
  brand?: {
    name?: string;
    avatar_url?: string;
    subtitle?: string;
  };
  stats?: {
    conversion_rate?: number;
    conversion_growth?: string | number;
    active_products?: number;
    active_products_growth?: string | number;
    new_orders_today?: number;
    new_orders_growth?: string | number;
    today_revenue?: number;
    today_revenue_growth?: string | number;
  };
  top_products?: Record<string, number>;
  category_revenue?: Record<string, number>;
  category_distribution?: Record<string, number>;
  recent_orders?: Array<{
    id?: number | string;
    tracking_code?: string;
    date?: string;
    date_full?: string;
    items_count?: number;
    total?: number;
    payment_status?: string;
    order_status?: string;
    status_text?: string;
    status_color?: string;
  }>;
  summary?: {
    total_orders?: number;
    total_orders_growth?: string | number;
    pending_orders?: number;
    pending_growth?: string | number;
    total_revenue?: number;
    revenue_growth?: string | number;
    total_visitors?: number;
    total_visitors_growth?: string | number;
  };
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
    pending_orders?: number;
    pending_orders_change_percent?: number;
  };
}
