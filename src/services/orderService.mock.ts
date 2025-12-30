import type { GetOrdersResponse, Order, OrderStats } from "@/types/orderType";

const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    productName: "Canvas Backpack",
    date: "2025-01-10",
    amount: 89,
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-1002",
    productName: "Leather Wallet",
    date: "2025-01-09",
    amount: 45,
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-1003",
    productName: "Running Shoes",
    date: "2025-01-08",
    amount: 120,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-1004",
    productName: "Smart Watch",
    date: "2025-01-07",
    amount: 210,
    status: "processing",
    items: 1,
  },
  {
    id: "ORD-1005",
    productName: "Noise Cancelling Headphones",
    date: "2025-01-06",
    amount: 175,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-1006",
    productName: "Hoodie",
    date: "2025-01-05",
    amount: 65,
    status: "cancelled",
    items: 3,
  },
];

const mockStats: OrderStats = {
  allorders: mockOrders.length,
  inprocess: mockOrders.filter((order) => order.status === "processing").length,
  onroute: mockOrders.filter((order) => order.status === "shipped").length,
  delivered: mockOrders.filter((order) => order.status === "delivered").length,
  cancelled: mockOrders.filter((order) => order.status === "cancelled").length,
};

export const getOrdersService = async (): Promise<GetOrdersResponse> => {
  return {
    orders: mockOrders,
    stats: mockStats,
  };
};
