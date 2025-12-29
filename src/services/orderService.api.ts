import { getData } from "@/services/services";
import type { OrderHistoryData, OrderDetailsType, Order, OrderItem } from "@/types/orderTypes";

/**
 * GET /orders-consumer
 * Header: Authorization: Bearer <token>
 */
const END_POINT = "/orders-consumer";

const mapToOrderHistory = (order: any): Order => ({
  id: order?.orderID ?? order?.id ?? "",
  date: order?.orderDate ?? "",
  amount: order?.totalprice !== undefined ? String(order.totalprice) : "",
  status: order?.status ?? order?.orderStatus ?? "processing",
  items:
    typeof order?.items === "number"
      ? order.items
      : Array.isArray(order?.items)
      ? order.items.length
      : Number(order?.items?.length ?? 0),
  // statusColor: "bg-blue-500",
});

const normalizeStatusKey = (status: string): "processing" | "delivered" | "cancelled" => {
  const normalized = status?.trim().toLowerCase();
  if (normalized.includes("cancel")) return "cancelled";
  if (normalized.includes("لغو")) return "cancelled";
  if (normalized.includes("deliver")) return "delivered";
  if (normalized.includes("تحویل")) return "delivered";
  return "processing";
};

const bucketOrdersByStatus = (orders: Order[]): OrderHistoryData => {
  const buckets: OrderHistoryData = { current: [], past: [], cancelled: [] };

  orders.forEach((o) => {
    const key = normalizeStatusKey(o.status);
    if (key === "cancelled") buckets.cancelled.push(o);
    else if (key === "delivered") buckets.past.push(o);
    else buckets.current.push(o);
  });

  return buckets;
};

const mapItems = (items: any): OrderItem[] => {
  // Accept array, { items: [] }, object with keyed items (details), or single object; ignore numeric counts
  let arr: any[] = [];

  if (Array.isArray(items)) {
    arr = items;
  } else if (items && typeof items === "object") {
    if (Array.isArray(items.items)) {
      arr = items.items;
    } else {
      const values = Object.values(items);
      const hasObjectValues = values.some((v) => v && typeof v === "object");
      arr = hasObjectValues ? values : [items];
    }
  }

  return arr.map((item: any) => ({
    id: item?.id ?? item?.productId ?? "",
    name: item?.name ?? "",
    image: item?.image ?? "",
    size: item?.size ?? "",
    color: item?.color ?? "",
    cost:
      item?.cost !== undefined
        ? String(item.cost)
        : item?.price !== undefined
        ? String(item.price)
        : "",
    count:
      item?.count !== undefined
        ? Number(item.count)
        : item?.quantity !== undefined
        ? Number(item.quantity)
        : 0,
  }));
};

export const getOrderHistory = async (): Promise<OrderHistoryData> => {
  // normalize to expected shape even if API returns a flat list
  const response = (await getData({
    endPoint: END_POINT,
  })) as any;

  let collected: Order[] = [];

  if (Array.isArray(response)) {
    collected = response.map(mapToOrderHistory);
  } else {
    if (Array.isArray(response?.current)) {
      collected = collected.concat(response.current.map(mapToOrderHistory));
    }
    if (Array.isArray(response?.past)) {
      collected = collected.concat(response.past.map(mapToOrderHistory));
    }
    if (Array.isArray(response?.cancelled)) {
      collected = collected.concat(response.cancelled.map(mapToOrderHistory));
    }
  }

  return bucketOrdersByStatus(collected);
};

/**
 * GET /orders-consumer/:orderId
 */
export const getOrderDetails = (
  orderId: string
): Promise<OrderDetailsType> => {
  return getData({
    endPoint: `${END_POINT}/${orderId}`,
  }).then((order: any) => {
    const normalizedOrder = Array.isArray(order) ? order[0] : order;
    const candidateItems =
      normalizedOrder?.details ??
      normalizedOrder?.orderDetails ??
      normalizedOrder?.items;

    return {
      id: normalizedOrder?.orderID ?? normalizedOrder?.id ?? "",
      orderDate: normalizedOrder?.orderDate ?? "",
      status: normalizedOrder?.status ?? normalizedOrder?.orderStatus,
      totalPrice:
        normalizedOrder?.totalprice !== undefined
          ? String(normalizedOrder.totalprice)
          : "",
      details: mapItems(candidateItems ?? []),
    };
  }) as Promise<OrderDetailsType>;
};
