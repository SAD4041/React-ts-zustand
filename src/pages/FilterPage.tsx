// src/pages/FilterPage.tsx
import { useParams, useLocation } from "react-router-dom";
import ProductListing from "@/components/ProductListing/productListing";

const FilterPage = () => {
  const { type, value } = useParams<{ type: string; value: string }>();
  const location = useLocation();

  // بر اساس type، prop مناسب را به ProductListing بده
  const props: {
    category?: string;
    brand?: string;
    modelStyle?: string;
    subcategory?: string;
    gender?: string;
  } = {};

  switch (type?.toLowerCase()) {
    case "category":
      props.category = value;
      break;
    case "style":
      props.modelStyle = value; // چون در ProductListing نام پراپ `modelStyle` است
      break;
    case "brand":
      props.brand = value;
      break;
    case "subcategory":
      props.subcategory = value;
      break;
    case "gender":
      props.gender = value;
      break;
    default:
      // اگر type نامعتبر بود، فقط value را به عنوان category در نظر می‌گیریم (fallback)
      props.category = value;
  }

  return <ProductListing {...props} />;
};

export default FilterPage;