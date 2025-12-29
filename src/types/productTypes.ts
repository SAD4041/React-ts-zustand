export interface Product {
  id: string;
  name: string;
  images: string[];
  category: string;
  sku: string;
  stock: number;
  price: number;
  status: "active" | "inactive";
  sex?: string;
  model?: string;
}

export interface GetProductsResponse {
  products: Product[];
}

export interface CreateProductPayload {
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  description?: string;
  images: string[];
  sex?: string;
  model?: string;
}

export interface CreateProductResponse {
  product: Product;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: "active" | "inactive";
}
