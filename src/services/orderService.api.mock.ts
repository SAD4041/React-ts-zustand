import type {
  OrderHistoryData,
  OrderDetailsType,
  Order,
} from "@/types/orderTypes";

const mockOrders: Order[] = [
  {
    id: "ORD-2001",
    date: "2025-01-12",
    amount: 180000,
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-2002",
    date: "2025-01-09",
    amount: 420000,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-2003",
    date: "2025-01-07",
    amount: 95000,
    status: "cancelled",
    items: 3,
  },
  {
    id: "ORD-2004",
    date: "2025-01-05",
    amount: 260000,
    status: "processing",
    items: 1,
  },
  {
    id: "ORD-2005",
    date: "2024-12-28",
    amount: 310000,
    status: "delivered",
    items: 2,
  },
];

const mockDetails: Record<string, OrderDetailsType> = {
  "ORD-2001": {
    id: "ORD-2001",
    orderDate: "2025-01-12",
    status: "processing",
    totalPrice: 180000,
    details: [
      {
        id: "P-100",
        name: "Canvas Backpack",
        image: "/images/sample-product-1.jpg",
        size: "L",
        color: "Black",
        cost: 90000,
        count: 2,
      },
    ],
  },
  "ORD-2002": {
    id: "ORD-2002",
    orderDate: "2025-01-09",
    status: "delivered",
    totalPrice: 420000,
    details: [
      {
        id: "P-210",
        name: "Leather Shoes",
        image: "/images/sample-product-2.jpg",
        size: "42",
        color: "Brown",
        cost: 420000,
        count: 1,
      },
    ],
  },
  "ORD-2003": {
    id: "ORD-2003",
    orderDate: "2025-01-07",
    status: "cancelled",
    totalPrice: 95000,
    details: [
      {
        id: "P-305",
        name: "Cotton T-Shirt",
        image: "/images/sample-product-3.jpg",
        size: "M",
        color: "White",
        cost: 95000,
        count: 1,
      },
    ],
  },
  "ORD-2004": {
    id: "ORD-2004",
    orderDate: "2025-01-05",
    status: "processing",
    totalPrice: 260000,
    details: [
      {
        id: "P-410",
        name: "Smart Watch",
        image: "/images/sample-product-4.jpg",
        size: "One Size",
        color: "Gray",
        cost: 260000,
        count: 1,
      },
    ],
  },
  "ORD-2005": {
    id: "ORD-2005",
    orderDate: "2024-12-28",
    status: "delivered",
    totalPrice: 310000,
    details: [
      {
        id: "P-520",
        name: "Hoodie",
        image: "/images/sample-product-5.jpg",
        size: "XL",
        color: "Navy",
        cost: 155000,
        count: 2,
      },
    ],
  },
};

const bucketOrdersByStatus = (orders: Order[]): OrderHistoryData => {
  const buckets: OrderHistoryData = { current: [], past: [], cancelled: [] };

  orders.forEach((order) => {
    const normalized = order.status.toLowerCase();
    if (normalized.includes("cancel")) buckets.cancelled.push(order);
    else if (normalized.includes("deliver")) buckets.past.push(order);
    else buckets.current.push(order);
  });

  return buckets;
};

export const getOrderHistory = async (): Promise<OrderHistoryData> => {
  return bucketOrdersByStatus(mockOrders);
};

export const getOrderDetails = async (
  orderId: string
): Promise<OrderDetailsType> => {
  return (
    mockDetails[orderId] ?? {
      id: orderId,
      orderDate: "",
      totalPrice: "",
      details: [],
    }
  );
};
