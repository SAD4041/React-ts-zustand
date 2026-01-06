import axios from "axios";
import type {
  Product,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { baseURL, getData, postImageData, deleteData } from "./services";
import useUserStore from "@/store/userStore/userStore";
import { getUserIdFromToken } from "@/utils/jwtUtils";

const normalizeListArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (value === undefined || value === null) return [];
  const normalized = String(value).trim();
  return normalized ? [normalized] : [];
};

const normalizeProduct = (product: any): Product => {
  const imageSource =
    product?.images ??
    product?.picture ??
    product?.pictures ??
    product?.image ??
    product?.image_url ??
    product?.imageUrl ??
    product?.image_path ??
    product?.imagePath ??
    null;
  const images = Array.isArray(imageSource)
    ? imageSource
    : imageSource
    ? [imageSource]
    : [];
  const rawId =
    product?.id ?? product?.product_id ?? product?.productId ?? product?.product_serial ?? "";
  const rawPrice = product?.price ?? product?.unit_price ?? 0;
  const rawStock = product?.inventory_count ?? product?.stock ?? product?.inventory ?? 0;
  const price = Number(rawPrice);
  const stock = Number(rawStock);
  const color = normalizeListArray(product?.color);
  const size = normalizeListArray(product?.size ?? product?.sizes).join(", ");
  return {
    id: rawId ? String(rawId) : "",
    name: product?.name ?? "",
    images,
    category: product?.category ?? "",
    sku: product?.product_serial ?? product?.sku ?? "",
    stock: Number.isNaN(stock) ? 0 : stock,
    price: Number.isNaN(price) ? 0 : price,
    status: product?.status === "inactive" ? "inactive" : "active",
    description: product?.description ?? "",
    brand: product?.brand ?? "",
    color: color.length ? color : undefined,
    size: size || undefined,
    marketId:
      product?.market_id !== undefined && product?.market_id !== null
        ? Number(product.market_id)
        : product?.marketId !== undefined && product?.marketId !== null
        ? Number(product.marketId)
        : undefined,
    gender: product?.gender ?? product?.sex ?? undefined,
    model: product?.category_model ?? product?.model ?? undefined,
  };
};

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

const toMarketIdPayload = (marketId: string | null) => {
  if (!marketId) return undefined;
  const numericId = Number(marketId);
  return { market_id: Number.isNaN(numericId) ? marketId : numericId };
};

const ensureMarketId = async () => {
  const current = getMarketId();
  if (current) return current;
  try {
    return await refreshMarketId();
  } catch (error) {
    return null;
  }
};

const getAuthHeaders = () => {
  const token = useUserStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const requestProducts = async (marketId: string | null) =>
  axios.request({
    baseURL,
    url: "/api/manager/Rproduct",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    params: toMarketIdPayload(marketId),
    data: toMarketIdPayload(marketId),
    timeout: 20000,
  });

const appendFormValue = (
  formData: FormData,
  key: string,
  value: string | number | undefined | null
) => {
  if (value === undefined || value === null) return;
  formData.append(key, String(value));
};

const normalizeListInput = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const appendListValues = (formData: FormData, key: string, values: string[]) => {
  if (values.length === 0) return;
  values.forEach((value) => {
    formData.append(`${key}[]`, value);
  });
};

const appendImageFiles = (formData: FormData, files?: File[]) => {
  if (!files || files.length === 0) return;
  files.forEach((file) => {
    if (file) {
      formData.append("picture[]", file);
    }
  });
};

const buildProductFormData = (
  payload: CreateProductPayload | UpdateProductPayload
) => {
  const formData = new FormData();
  const marketId = getMarketId();
  if (marketId) {
    formData.append("market_id", marketId);
  }

  appendFormValue(formData, "name", payload.name);
  appendFormValue(formData, "brand", payload.brand);
  appendFormValue(formData, "product_serial", payload.sku);
  appendFormValue(formData, "price", payload.price);
  appendFormValue(formData, "description", payload.description);
  appendFormValue(formData, "category", payload.category);
  appendFormValue(formData, "category_model", payload.model);
  appendListValues(formData, "color", normalizeListInput(payload.color));
  appendFormValue(formData, "size", payload.size);
  appendFormValue(
    formData,
    "gender",
    payload.gender ?? (payload as { sex?: string }).sex
  );
  appendFormValue(formData, "inventory_count", payload.stock);
  appendImageFiles(formData, payload.imageFiles);

  return formData;
};

export const getProductsService = async (): Promise<GetProductsResponse> => {
  let marketId = getMarketId();
  let products;

  try {
    const response = await requestProducts(marketId);
    products = response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    if (!marketId || status === 404 || status === 422) {
      const refreshedMarketId = await refreshMarketId().catch(() => null);
      if (refreshedMarketId && refreshedMarketId !== marketId) {
        marketId = refreshedMarketId;
        const response = await requestProducts(refreshedMarketId);
        products = response.data;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }

  const source = Array.isArray(products)
    ? products
    : Array.isArray(products?.products)
    ? products.products
    : Array.isArray(products?.data)
    ? products.data
    : [];
  const normalizedProducts = source.map(normalizeProduct);

  return {
    products: normalizedProducts,
  };
};

export const createProductService = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  await ensureMarketId();
  const formData = buildProductFormData(payload);
  const product = await postImageData({
    endPoint: "/api/manager/Cproduct",
    data: formData,
  });

  return {
    product: normalizeProduct(product),
  };
};

export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  await ensureMarketId();
  const formData = buildProductFormData(payload);
  const normalizedId = String(productId ?? "").trim();
  if (normalizedId) {
    formData.append("id", normalizedId);
    const numericId = Number(normalizedId);
    if (!Number.isNaN(numericId)) {
      formData.append("product_id", String(numericId));
    } else if (!payload.sku) {
      formData.append("product_serial", normalizedId);
    }
  }
  const product = await postImageData({
    endPoint: "/api/manager/Uproduct",
    data: formData,
  });

  return normalizeProduct(product);
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  const formData = new FormData();
  const numericId = Number(productId);
  if (Number.isNaN(numericId)) {
    formData.append("product_serial", String(productId));
  } else {
    formData.append("product_id", String(numericId));
  }
  await deleteData({
    endPoint: "/api/manager/Dproduct",
    data: formData,
  });
};
