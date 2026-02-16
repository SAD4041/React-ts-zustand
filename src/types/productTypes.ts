export interface Product {
  id: string;
  name: string;
  images: string[];
  category: string;
  sku: string;
  stock: number;
  price: number;
  status: "active" | "inactive";
  description?: string;
  brand?: string;
  color?: string[];
  size?: string;
  marketId?: number;
  gender?: string;
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
  imageFiles: File[];
  imageFilePreviews: string[];
  brand?: string;
  color?: string;
  size?: string;
  gender?: string;
  model?: string;
  status: "active" | "inactive";
}

export interface CreateProductResponse {
  product: Product;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: "active" | "inactive";
}
