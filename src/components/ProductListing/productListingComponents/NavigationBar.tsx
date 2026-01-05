import React from "react";
import {
  Home,
  Search,
  Shirt,
  Users,
  Tag,
  Package,
  ChevronLeft,
} from "lucide-react";
import {
  brandLabels,
  categoryLabels,
  genderLabels,
  modelStyleLabels,
  subCategoryLabels,
} from "@/data/productListingData";

interface NavigationBarProps {
  category?: string | null;
  subCategory?: string | null;
  brand?: string | null;
  modelStyle?: string | null;
  gender?: string | null;
  searchQuery?: string | null;
  productName?: string | null;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  category,
  subCategory,
  brand,
  modelStyle,
  gender,
  searchQuery,
  productName,
}) => {
  const items: {
    key: string;
    label: string;
    icon: React.ReactNode;
    emphasis?: "search" | "product" | false;
  }[] = [
      {
        key: "home",
        label: "خانه",
        icon: <Home className="w-4 h-4" />,
        emphasis: false,
      },
    ];

  if (gender) {
    items.push({
      key: "gender",
      label: genderLabels[gender] || gender,
      icon: <Users className="w-4 h-4" />,
      emphasis: false,
    });
  }

  if (category) {
    items.push({
      key: "category",
      label: categoryLabels[category] || category,
      icon: <Shirt className="w-4 h-4" />,
      emphasis: false,
    });
  }

  if (subCategory) {
    items.push({
      key: "subcategory",
      label: subCategoryLabels[subCategory] || subCategory,
      icon: <Tag className="w-4 h-4" />,
      emphasis: false,
    });
  } else if (modelStyle) {
    items.push({
      key: "modelstyle",
      label: modelStyleLabels[modelStyle] || modelStyle,
      icon: <Tag className="w-4 h-4" />,
      emphasis: false,
    });
  }

  if (brand) {
    items.push({
      key: "brand",
      label: brandLabels[brand] || brand,
      icon: <Package className="w-4 h-4" />,
      emphasis: false,
    });
  }

  if (productName) {
    items.push({
      key: "product-name",
      label: productName,
      icon: <Package className="w-4 h-4" />,
      emphasis: "product",
    });
  } else if (searchQuery) {
    items.push({
      key: "search",
      label: searchQuery,
      icon: <Search className="w-4 h-4" />,
      emphasis: "search",
    });
  }

  return (
    <div className="w-full" dir="ltr">
      <div className="flex items-center justify-start gap-3 overflow-x-auto px-5 py-3 bg-white border border-border shadow-sm flex-row-reverse mb-5">
        {items.map((item, index) => (
          <React.Fragment key={item.key}>
            <div
              className={`flex items-center gap-2 whitespace-nowrap text-sm ${item.emphasis
                ? item.emphasis === "product"
                  ? "bg-secondary text-white px-4 py-1.5 rounded-3xl"
                  : "bg-secondary text-secondary-foreground px-4 py-1.5"
                : "text-foreground px-1.5"
                }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            {index < items.length - 1 && (
              <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
