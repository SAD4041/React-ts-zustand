import { getData, postData, putData, deleteData } from "./services";
import useUserStore from "@/store/userStore/userStore";
import { getUserIdFromToken } from "@/utils/jwtUtils";
import { formatPersianDate } from "@/utils/formatPersianDate";
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
const MANAGER_ORDERLIST_ENDPOINT = "/api/manager/orderlist";

const makeFallbackId = () =>
  Math.random().toString(36).replace(/[^a-z0-9]+/g, "").slice(0, 8);

const normalizeMarketId = (value: unknown) => {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized || normalized === "null" || normalized === "undefined") {
    return null;
  }
  return normalized;
};

const getMarketIdFromUser = (user: unknown) =>
  normalizeMarketId(
    (user as Record<string, unknown> | null)?.market_id ??
      (user as Record<string, unknown> | null)?.manager_id ??
      (user as Record<string, unknown> | null)?.marketId ??
      (user as Record<string, unknown> | null)?.managerId
  );

const getMarketIdFromProfile = (profile: unknown) =>
  normalizeMarketId(
    (profile as Record<string, unknown> | null)?.manager_id ??
      (profile as Record<string, unknown> | null)?.market_id ??
      (profile as Record<string, unknown> | null)?.marketId ??
      (profile as Record<string, unknown> | null)?.id
  );

const getMarketId = () => {
  if (typeof window === "undefined") return null;
  const stored = normalizeMarketId(
    localStorage.getItem("marketId") ?? localStorage.getItem("userId")
  );
  if (stored) return stored;

  const { user, token } = useUserStore.getState();
  const userMarketId =
    getMarketIdFromUser(user) ??
    normalizeMarketId((user as Record<string, unknown> | null)?.id);
  if (userMarketId) {
    localStorage.setItem("marketId", userMarketId);
    return userMarketId;
  }

  const tokenMarketId = token
    ? normalizeMarketId(getUserIdFromToken(token))
    : null;
  if (tokenMarketId) {
    localStorage.setItem("marketId", tokenMarketId);
    return tokenMarketId;
  }

  return null;
};

const refreshMarketId = async () => {
  if (typeof window === "undefined") return null;
  const profile = await getData({ endPoint: "/api/manager/profile" });
  const marketId = getMarketIdFromProfile(profile);
  if (marketId) {
    localStorage.setItem("marketId", marketId);
  }
  return marketId;
};

const normalizeStatus = (status: string | undefined): OrderStatus => {
  const value = String(status ?? "").trim().toLowerCase();
  if (!value) return "processing";
  if (
    value.includes("cancel") ||
    value.includes("canceled") ||
    value.includes("\u0644\u063a\u0648") ||
    value.includes("\u06a9\u0646\u0633\u0644")
  ) {
    return "cancelled";
  }
  if (value.includes("deliver") || value.includes("\u062a\u062d\u0648\u06cc\u0644")) {
    return "delivered";
  }
  if (
    value.includes("ship") ||
    value.includes("onroute") ||
    value.includes("on_route") ||
    value.includes("\u0627\u0631\u0633\u0627\u0644") ||
    value.includes("\u062d\u0645\u0644")
  ) {
    return "shipped";
  }
  if (value.includes("process") || value.includes("inprocess") || value.includes("\u067e\u0631\u062f\u0627\u0632\u0634")) {
    return "processing";
  }
  return "processing";
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizeOrder = (order: OrderApiRecord): Order => {
  const quantity = toNumber(order?.count ?? order?.items ?? order?.quantity) ?? 0;
  const explicitTotal = toNumber(order?.total_price ?? order?.amount);
  const unitPrice = toNumber(order?.price ?? order?.product?.price);
  const amount =
    explicitTotal && explicitTotal > 0
      ? explicitTotal
      : unitPrice
      ? unitPrice * (quantity > 0 ? quantity : 1)
      : 0;
  const rawDate =
    order?.orderDate ??
    order?.date ??
    order?.createdAt ??
    order?.created_at ??
    order?.orderlist?.created_at ??
    "";

  return {
    id: String(
      order?.id ??
        order?.serial_number ??
        order?.orderlist_id ??
        makeFallbackId()
    ),
    productName:
      order?.productName ??
      order?.product_name ??
      order?.name ??
      order?.title ??
      order?.product?.name ??
      "Unknown product",
    date: formatPersianDate(rawDate),
    amount,
    status: normalizeStatus(
      order?.status ??
        order?.order_status ??
        order?.orderlist?.status ??
        order?.orderlist?.order_status ??
        order?.product?.status
    ),
    items: quantity,
  };
};

const extractOrdersArray = (data: any): OrderApiRecord[] => {
  if (Array.isArray(data)) return data as OrderApiRecord[];
  if (Array.isArray(data?.orders)) return data.orders as OrderApiRecord[];
  if (Array.isArray(data?.orderlistItem))
    return data.orderlistItem as OrderApiRecord[];
  if (Array.isArray(data?.orderlistItems))
    return data.orderlistItems as OrderApiRecord[];
  if (Array.isArray(data?.order_list_items))
    return data.order_list_items as OrderApiRecord[];
  if (Array.isArray(data?.data)) return data.data as OrderApiRecord[];
  if (Array.isArray(data?.data?.orderlistItem))
    return data.data.orderlistItem as OrderApiRecord[];
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
  let marketId = getMarketId();
  if (!marketId) {
    marketId = await refreshMarketId().catch(() => null);
  }
  if (!marketId) {
    throw new Error("Missing market id");
  }

  let data: any;

  try {
    data = await getData({
      endPoint: `${MANAGER_ORDERLIST_ENDPOINT}/${marketId}`,
    });
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 404 || status === 422) {
      const refreshedMarketId = await refreshMarketId().catch(() => null);
      if (refreshedMarketId && refreshedMarketId !== marketId) {
        marketId = refreshedMarketId;
        data = await getData({
          endPoint: `${MANAGER_ORDERLIST_ENDPOINT}/${marketId}`,
        });
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }

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


