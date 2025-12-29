import type {
  Product,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { getData, postData, putData, deleteData } from "./services";

const normalizeProduct = (product: any): Product => {
  const images = Array.isArray(product?.images)
    ? product.images
    : product?.image
    ? [product.image]
    : [];
  return {
    ...product,
    images,
  };
};

export const getProductsService = async (): Promise<GetProductsResponse> => {
  const products = await getData({
    endPoint: "/api/manager/Rproduct",
  });

  const normalizedProducts = Array.isArray(products)
    ? products.map(normalizeProduct)
    : [];

  return {
    products: normalizedProducts,
  };
};

export const createProductService = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  const product = await postData({
    endPoint: "/api/manager/Cproduct",
    data: {
      ...payload,
      status: "active", // default
    },
  });

  return {
    product: normalizeProduct(product),
  };
};

export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  const product = await putData({
    endPoint: `${"/api/manager/Uproduct"}/${productId}`,
    data: payload,
  });

  return normalizeProduct(product);
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  await deleteData({
    endPoint: `${"/api/manager/Dproduct"}/${productId}`,
  });
};
