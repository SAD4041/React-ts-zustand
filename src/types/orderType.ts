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
  id: string | number;
  serial_number?: string;
  orderlist_id?: string | number;
  product_id?: string | number;
  productName?: string;
  product_name?: string;
  name?: string;
  title?: string;
  orderDate?: string;
  date?: string;
  createdAt?: string;
  created_at?: string;
  updated_at?: string;
  count?: number;
  items?: number;
  quantity?: number;
  price?: number | string;
  amount?: number | string;
  total_price?: number | string;
  order_status?: string;
  status?: string;
  orderlist?: {
    status?: string;
    order_status?: string;
    created_at?: string;
  };
  product?: {
    id?: string | number;
    name?: string;
    price?: number | string;
    status?: string;
  };
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
