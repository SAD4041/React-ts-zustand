import type { BrandDashboardResponse } from "@/types/brandDashTypes";

export const mockBrandDashboardResponse: BrandDashboardResponse = {
  brand: {
    name: "Aster & Co.",
    avatar_url: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=200&h=200&fit=crop",
    subtitle: "Premium lifestyle brand",
  },
  stats: {
    conversion_rate: { value: 3.8, change_percent: 0.6 },
    active_products: { value: 128, change_percent: 4.2 },
    new_orders: { value: 46, change_percent: -3.1 },
    today_revenue: { value: 12850000, change_percent: 7.4 },
  },
  charts: {
    top_products: [
      { name: "Linen Hoodie", sales: 420 },
      { name: "Terra Tote", sales: 360 },
      { name: "Aster Cap", sales: 310 },
      { name: "Nimbus Bottle", sales: 275 },
      { name: "Trail Sneakers", sales: 190 },
    ],
    revenue_by_category: [
      { name: "Apparel", revenue: 5200000 },
      { name: "Accessories", revenue: 3400000 },
      { name: "Footwear", revenue: 2400000 },
      { name: "Lifestyle", revenue: 1800000 },
    ],
    category_distribution: [
      { name: "Apparel", value: 46, color: "#F97316" },
      { name: "Accessories", value: 28, color: "#0EA5E9" },
      { name: "Footwear", value: 16, color: "#22C55E" },
      { name: "Lifestyle", value: 10, color: "#A855F7" },
    ],
  },
  recent_orders: [
    { id: "#ORD-1042", date: "2024-07-19", quantity: 3, amount: 820000, status: "Delivered", status_variant: "success" },
    { id: "#ORD-1041", date: "2024-07-19", quantity: 1, amount: 320000, status: "Processing", status_variant: "info" },
    { id: "#ORD-1040", date: "2024-07-18", quantity: 2, amount: 610000, status: "Pending", status_variant: "warning" },
    { id: "#ORD-1039", date: "2024-07-18", quantity: 5, amount: 1450000, status: "Delivered", status_variant: "success" },
  ],
  summary: {
    total_orders: 1246,
    total_orders_change_percent: 5.2,
    total_visitors: 18450,
    total_visitors_change_percent: 2.1,
    total_revenue: 98200000,
    total_revenue_change_percent: 6.7,
  },
};
