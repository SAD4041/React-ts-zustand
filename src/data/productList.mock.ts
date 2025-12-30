import shortTshirt from "@/assets/shortTshirt.jpg";
import longTshirt from "@/assets/longTshirt.png";
import dress from "@/assets/dress.png";
import type { Product } from "@/types/productListingTypes";

const toSizes = (labels: string[]) => labels.map((label) => ({ label }));

const buildProduct = (
  product: Omit<Product, "discountedPrice">,
): Product => ({
  ...product,
  discountedPrice: product.hasDiscount
    ? Math.floor(product.price - (product.price * product.discount) / 100)
    : product.price,
});

export const mockProducts: Product[] = [
  buildProduct({
    id: "1",
    name: "Basic Tee",
    model: "Nike",
    category: "tshirt",
    image: shortTshirt,
    price: 320000,
    discount: 15,
    hasDiscount: true,
    rating: 4.3,
    stock: 42,
    ratingCount: 128,
    sales: 342,
    sizes: toSizes(["S", "M", "L", "XL"]),
    colors: [
      { hex: "#000000", label: "Black" },
      { hex: "#FFFFFF", label: "White" },
    ],
  }),
  buildProduct({
    id: "p-002",
    name: "Long Sleeve Tee",
    model: "Adidas",
    category: "tshirt",
    image: longTshirt,
    price: 450000,
    discount: 20,
    hasDiscount: true,
    rating: 4.6,
    stock: 30,
    ratingCount: 96,
    sales: 218,
    sizes: toSizes(["M", "L", "XL"]),
    colors: [
      { hex: "#1F2937", label: "Charcoal" },
      { hex: "#2563EB", label: "Blue" },
    ],
  }),
  buildProduct({
    id: "p-003",
    name: "Summer Dress",
    model: "Prada",
    category: "dress",
    image: dress,
    price: 780000,
    discount: 10,
    hasDiscount: true,
    rating: 4.8,
    stock: 18,
    ratingCount: 64,
    sales: 140,
    sizes: toSizes(["S", "M", "L"]),
    colors: [
      { hex: "#DB2777", label: "Rose" },
      { hex: "#6B21A8", label: "Purple" },
    ],
  }),
  buildProduct({
    id: "p-004",
    name: "Active Hoodie",
    model: "ZARA",
    category: "hoodie",
    image: longTshirt,
    price: 690000,
    discount: 0,
    hasDiscount: false,
    rating: 4.1,
    stock: 25,
    ratingCount: 77,
    sales: 102,
    sizes: toSizes(["M", "L", "XL", "2XL"]),
    colors: [
      { hex: "#111827", label: "Ink" },
      { hex: "#F59E0B", label: "Amber" },
    ],
  }),
  buildProduct({
    id: "p-005",
    name: "Everyday Shorts",
    model: "Mango",
    category: "shorts",
    image: shortTshirt,
    price: 280000,
    discount: 5,
    hasDiscount: true,
    rating: 4.0,
    stock: 60,
    ratingCount: 51,
    sales: 190,
    sizes: toSizes(["S", "M", "L", "XL"]),
    colors: [
      { hex: "#10B981", label: "Mint" },
      { hex: "#374151", label: "Slate" },
    ],
  }),
  buildProduct({
    id: "p-006",
    name: "Classic Polo",
    model: "Puma",
    category: "polo",
    image: longTshirt,
    price: 520000,
    discount: 25,
    hasDiscount: true,
    rating: 4.5,
    stock: 34,
    ratingCount: 110,
    sales: 255,
    sizes: toSizes(["S", "M", "L", "XL", "2XL"]),
    colors: [
      { hex: "#2563EB", label: "Royal" },
      { hex: "#D97706", label: "Bronze" },
      { hex: "#065F46", label: "Forest" },
    ],
  }),
];

export const getMockProducts = (): Product[] => mockProducts.map((item) => ({ ...item }));
