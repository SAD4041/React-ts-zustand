import shortTshirt from "@/assets/shortTshirt.jpg";
import longTshirt from "@/assets/longTshirt.png";
import dress from "@/assets/dress.png";
import type { Brand, ColorOption, SubCategory } from "@/types/productListingTypes";

export const productsPerPage = 4;
export const pagesPerGroup = 5;
export const productsPerGroup = productsPerPage * pagesPerGroup;
export const currentCategory = "tshirt";

export const categoryLabels: Record<string, string> = {
  accessory: "اکسسوری",
  "warm-clothes": "لباس گرم",
  pants: "شلوار",
  pullover: "پلیور",
  tshirt: "تیشرت",
};

export const brandLabels: Record<string, string> = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  reebok: "Reebok",
  prada: "Prada",
  zara: "ZARA",
  mango: "Mango",
  dior: "Dior",
};

export const modelStyleLabels: Record<string, string> = {
  casual: "روزمره",
  sport: "ورزشی",
  classic: "کلاسیک",
  formal: "رسمی",
};

export const genderLabels: Record<string, string> = {
  female: "زنانه",
  male: "مردانه",
  kids: "بچه‌گانه",
};

export const subCategoriesByCategory: Record<string, SubCategory[]> = {
  accessory: [
    { id: 1, title: "ساعت و زیورآلات", image: longTshirt, category: "accessory", slug: "watch-jewelry" },
    { id: 2, title: "کیف و کلاه", image: shortTshirt, category: "accessory", slug: "bag-hat" },
    { id: 3, title: "کمربند و دستکش", image: dress, category: "accessory", slug: "belt-gloves" },
  ],
  "warm-clothes": [
    { id: 4, title: "کاپشن", image: longTshirt, category: "warm-clothes", slug: "jacket" },
    { id: 5, title: "بارانی", image: shortTshirt, category: "warm-clothes", slug: "raincoat" },
    { id: 6, title: "پالتو", image: dress, category: "warm-clothes", slug: "coat" },
  ],
  pants: [
    { id: 7, title: "جین", image: longTshirt, category: "pants", slug: "jeans" },
    { id: 8, title: "اسلش", image: shortTshirt, category: "pants", slug: "slim" },
    { id: 9, title: "راحتی", image: dress, category: "pants", slug: "casual-pants" },
  ],
  pullover: [
    { id: 10, title: "یقه‌گرد", image: longTshirt, category: "pullover", slug: "crew" },
    { id: 11, title: "یقه‌اسکی", image: shortTshirt, category: "pullover", slug: "turtleneck" },
    { id: 12, title: "جلو دکمه‌دار", image: dress, category: "pullover", slug: "cardigan" },
  ],
  tshirt: [
    { id: 13, title: "آستین کوتاه", image: shortTshirt, category: "tshirt", slug: "short-sleeve" },
    { id: 14, title: "آستین بلند", image: longTshirt, category: "tshirt", slug: "long-sleeve" },
    { id: 15, title: "یقه هفت", image: dress, category: "tshirt", slug: "v-neck" },
  ],
};

export const subCategoryLabels: Record<string, string> = Object.values(subCategoriesByCategory)
  .flat()
  .reduce<Record<string, string>>((acc, item) => {
    acc[item.slug] = item.title;
    return acc;
  }, {});

export const sorts = [
  { value: "most-revelent", label: "مرتبط‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "most-salled", label: "پرفروش‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "chosen", label: "برگزیده" },
];

export const brands: Brand[] = [
  { id: 1, name: "Prada", slug: "prada" },
  { id: 2, name: "ZARA", slug: "zara" },
  { id: 3, name: "Dior", slug: "dior" },
  { id: 4, name: "Loius Vuitton", slug: "louis-vuitton" },
  { id: 5, name: "Mango", slug: "mango" },
  { id: 6, name: "Adidas", slug: "adidas" },
  { id: 7, name: "Nike", slug: "nike" },
  { id: 8, name: "Puma", slug: "puma" },
  { id: 9, name: "Reebok", slug: "reebok" },
];

export const sizes: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export const colors: ColorOption[] = [
  { name: "آبی", code: "#007BFF" },
  { name: "قرمز", code: "#FF6B6B" },
  { name: "سبز", code: "#228B22" },
  { name: "مشکی", code: "#000000" },
  { name: "سفید", code: "#FFFFFF" },
  { name: "طلایی", code: "#FFD700" },
  { name: "نارنجی", code: "#FF8C00" },
  { name: "صورتی", code: "#DC3545" },
  { name: "خاکستری", code: "#6C757D" },
  { name: "بنفش", code: "#9B59B6" },
];
