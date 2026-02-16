import { getData } from "@/services/services";
import type { OrderHistoryData, OrderDetailsType, Order, OrderItem } from "@/types/orderTypes";
import { formatPersianDate } from "@/utils/formatPersianDate";

const LIST_ENDPOINT = "/api/user/orderlists";
const DETAILS_ENDPOINT = "/api/user/orderlist/items";

const mapToOrderHistory = (order: any): Order => ({
  id: order?.serial_number ?? order?.id ?? "",
  date: formatPersianDate(order?.created_at ?? order?.order_date ?? ""),
  amount:
    order?.price !== undefined
      ? String(order.price)
      : order?.total_price !== undefined
      ? String(order.total_price)
      : "",
  status: order?.order_status ?? "در حال پردازش",
  items:
    typeof order?.count === "number"
      ? Number(order.count)
      : typeof order?.items_count === "number"
      ? Number(order.items_count)
      : 0,
});

const normalizeStatusKey = (
  status?: string
): "processing" | "delivered" | "cancelled" => {
  const normalized = status?.trim().toLowerCase();
  if (!normalized) return "processing";
  if (normalized.includes("cancel") || normalized.includes("لغو")) return "cancelled";
  if (normalized.includes("deliver") || normalized.includes("تکمیل")) return "delivered";
  if (
    normalized.includes("processing") ||
    normalized.includes("ship") ||
    normalized.includes("ارسال") ||
    normalized.includes("پردازش")
  ) {
    return "processing";
  }
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
    id: String(item?.id ?? item?.product_id ?? item?.product?.id ?? ""),
    productId:
      item?.product_id !== undefined
        ? String(item.product_id)
        : item?.product?.id !== undefined
        ? String(item.product.id)
        : undefined,
    name: item?.product?.name ?? item?.name ?? "",
    image: item?.product?.image ?? item?.image ?? "",
    size: item?.size ?? "-",
    color: item?.color ?? "-",
    cost:
      item?.product?.price !== undefined
        ? String(item.product.price)
        : item?.price !== undefined
        ? String(item.price)
        : "",
    count:
      item?.quantity !== undefined
        ? Number(item.quantity)
        : item?.count !== undefined
        ? Number(item.count)
        : 0,
  }));
};

export const getOrderHistory = async (): Promise<OrderHistoryData> => {
  const response = (await getData({
    endPoint: LIST_ENDPOINT,
  })) as any;

  const list = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
    ? response.data
    : [];

  const collected = list.map(mapToOrderHistory);

  return bucketOrdersByStatus(collected);
};

export const getOrderDetails = (
  serialNumber: string,
  base?: Partial<OrderDetailsType>
): Promise<OrderDetailsType> => {
  return getData({
    endPoint: DETAILS_ENDPOINT,
    params: { serial_number: serialNumber },
  }).then((payload: any) => {
    const normalized = payload?.data ?? payload;
    const items = Array.isArray(normalized?.items)
      ? normalized.items
      : normalized?.items ?? normalized;

    return {
      id: normalized?.serial_number ?? serialNumber,
      orderDate: base?.orderDate ?? "",
      status: base?.status,
      totalPrice: base?.totalPrice ?? "",
      details: mapItems(items ?? []),
    };
  }) as Promise<OrderDetailsType>;
};
