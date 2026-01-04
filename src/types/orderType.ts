export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  productName: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: number;
}

export interface CreateOrderPayload {
  productName: string;
  orderDate: string;
  count: number;
  price: number;
  status: OrderStatus;
}

export interface UpdateOrderPayload extends Partial<CreateOrderPayload> {}

export interface OrderApiRecord {
  id: string;
  productName?: string;
  name?: string;
  title?: string;
  orderDate?: string;
  date?: string;
  createdAt?: string;
  count?: number;
  items?: number;
  quantity?: number;
  price?: number;
  amount?: number;
  status?: string;
}

export interface OrderStats {
  allorders?: number;
  inprocess?: number;
  onroute?: number;
  delivered?: number;
  cancelled?: number;
}

export interface GetOrdersResponse {
  orders: Order[];
  stats?: OrderStats | null;
}
