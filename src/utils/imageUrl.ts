import { baseURL } from "@/services/services";

const PLACEHOLDER_IMAGES = new Set([
  "/placeholder-logo.png",
  "/placeholder-banner.png",
]);

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

export const resolveImageUrl = (value?: string | null) => {
  if (!value) {
    return "";
  }
  if (value.startsWith("blob:") || value.startsWith("data:") || isAbsoluteUrl(value)) {
    return value;
  }
  if (PLACEHOLDER_IMAGES.has(value)) {
    return value;
  }
  if (value.startsWith("/")) {
    return `${baseURL}${value}`;
  }
  return `${baseURL}/${value}`;
};
