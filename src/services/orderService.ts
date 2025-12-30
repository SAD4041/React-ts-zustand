import { getData, postData, putData, deleteData } from "./services";
import type {
  CreateOrderPayload,
  GetOrdersResponse,
  Order,
  OrderApiRecord,
  OrderStatus,
  OrderStats,
  UpdateOrderPayload,
} from "@/types/orderType";

const ORDERS_ENDPOINT = "/orders";

const makeFallbackId = () =>
  Math.random().toString(36).replace(/[^a-z0-9]+/g, "").slice(0, 8);

const normalizeStatus = (status: string | undefined): OrderStatus => {
  const value = (status || "").toLowerCase();
  switch (value) {
    case "shipped":
    case "onroute":
    case "on_route":
      return "shipped";
    case "delivered":
      return "delivered";
    case "cancelled":
    case "canceled":
      return "cancelled";
    case "inprocess":
    case "processing":
    default:
      return "processing";
  }
};

const normalizeOrder = (order: OrderApiRecord): Order => ({
  id: String(order?.id ?? makeFallbackId()),
  productName:
    order?.productName ??
    order?.name ??
    order?.title ??
    "سفارش بدون نام",
  date: order?.orderDate ?? order?.date ?? order?.createdAt ?? "",
  amount: Number(order?.price ?? order?.amount ?? 0),
  status: normalizeStatus(order?.status),
  items: Number(order?.count ?? order?.items ?? order?.quantity ?? 0),
});

const extractOrdersArray = (data: any): OrderApiRecord[] => {
  if (Array.isArray(data)) return data as OrderApiRecord[];
  if (Array.isArray(data?.orders)) return data.orders as OrderApiRecord[];
  return [];
};

const normalizeStats = (
  statsLike: any,
  orders: Order[]
): OrderStats | null => {
  if (!statsLike && !orders.length) return null;

  const computed = orders.reduce(
    (acc, order) => {
      acc.allorders += 1;
      if (order.status === "processing") acc.inprocess += 1;
      if (order.status === "shipped") acc.onroute += 1;
      if (order.status === "delivered") acc.delivered += 1;
      if (order.status === "cancelled") acc.cancelled += 1;
      return acc;
    },
    { allorders: 0, inprocess: 0, onroute: 0, delivered: 0, cancelled: 0 }
  );

  const normalized: OrderStats = {
    allorders: Number(statsLike?.allorders ?? computed.allorders),
    inprocess: Number(statsLike?.inprocess ?? computed.inprocess),
    onroute: Number(statsLike?.onroute ?? computed.onroute),
    delivered: Number(statsLike?.delivered ?? computed.delivered),
    cancelled: Number(statsLike?.cancelled ?? computed.cancelled),
  };

  return normalized;
};

export const getOrdersService = async (): Promise<GetOrdersResponse> => {
  const data = await getData({
    endPoint: ORDERS_ENDPOINT,
  });

  const rawOrders = extractOrdersArray(data);
  const orders = rawOrders.map(normalizeOrder);
  const statsCandidate =
    !Array.isArray(data) && typeof data === "object" ? data?.stats ?? data : null;

  return {
    orders,
    stats: normalizeStats(statsCandidate, orders),
  };
};

export const createOrderService = async (
  payload: CreateOrderPayload
): Promise<Order> => {
  const created = await postData({
    endPoint: ORDERS_ENDPOINT,
    data: {
      ...payload,
      productName: payload.productName,
      orderDate: payload.orderDate,
      count: payload.count,
      price: payload.price,
      status: payload.status,
    },
  });

  return normalizeOrder(created as OrderApiRecord);
};

export const updateOrderService = async (
  orderId: string,
  payload: UpdateOrderPayload
): Promise<Order> => {
  const updated = await putData({
    endPoint: `${ORDERS_ENDPOINT}/${orderId}`,
    data: payload,
  });

  return normalizeOrder(updated as OrderApiRecord);
};

export const deleteOrderService = async (orderId: string): Promise<void> => {
  await deleteData({
    endPoint: `${ORDERS_ENDPOINT}/${orderId}`,
  });
};
