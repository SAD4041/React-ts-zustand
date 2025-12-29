import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

// Map API status strings (English or Persian) to badge variants
export const getOrderStatusVariant = (
  status: string
): VariantProps<typeof badgeVariants>["variant"] => {
  const normalized = status?.trim().toLowerCase();

  switch (normalized) {
    case "processing":
    case "در حال پردازش":
      return "secondary";
    case "delivered":
    case "تحویل شده":
      return "default";
    case "cancelled":
    case "لغو شده":
      return "destructive";
    default:
      // keep badge colored so text (white) stays visible
      return "secondary";
  }
};
