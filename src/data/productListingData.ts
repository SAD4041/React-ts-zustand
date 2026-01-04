import shortTshirt from "@/assets/shortTshirt.jpg";
import longTshirt from "@/assets/longTshirt.png";
import dress from "@/assets/dress.png";
import type { Brand, ColorOption, SubCategory } from "@/types/productListingTypes";

export const productsPerPage = 4;
export const pagesPerGroup = 5;
export const productsPerGroup = productsPerPage * pagesPerGroup;
export const currentCategory = "tshirt";

export const categoryLabels: Record<string, string> = {
  tshirt: "تیشرت",
  shirt: "پیراهن",
  shoes: "کفش",
  pants: "شلوار",
  dress: "پیراهن زنانه",
  bag: "کیف",
  hoodie: "هودی",
  shorts: "شلوارک",
  polo: "پولو",
  socks: "جوراب",
  tunic: "تونیک",
  blouse: "شومیز",
  raincoat: "بارانی",
  skirt: "دامن",
  coat: "پالتو",
  jeans: "شلوار جین",
  suit: "کت و شلوار",
  "baby-clothes": "لباس نوزاد",
  "kids-shoes": "کفش بچه",
  doll: "عروسک",
  "kids-accessory": "اکسسوری بچه",
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
  tshirt: [
    { id: 1, title: "آستین بلند", image: longTshirt, category: "tshirt", slug: "long-sleeve" },
    { id: 2, title: "آستین کوتاه", image: shortTshirt, category: "tshirt", slug: "short-sleeve" },
  ],
  dress: [
    { id: 3, title: "مجلسى", image: dress, category: "dress", slug: "evening" },
    { id: 4, title: "روزمره", image: shortTshirt, category: "dress", slug: "casual-dress" },
  ],
  hoodie: [
    { id: 5, title: "کلاسیک", image: longTshirt, category: "hoodie", slug: "casual-hoodie" },
    { id: 6, title: "ورزشی", image: shortTshirt, category: "hoodie", slug: "sport-hoodie" },
  ],
  shorts: [
    { id: 7, title: "تمرینی", image: shortTshirt, category: "shorts", slug: "training-shorts" },
    { id: 8, title: "روزمره", image: longTshirt, category: "shorts", slug: "casual-shorts" },
  ],
  polo: [
    { id: 9, title: "کلاسیک", image: longTshirt, category: "polo", slug: "classic-polo" },
    { id: 10, title: "ورزشی", image: shortTshirt, category: "polo", slug: "sport-polo" },
  ],
  socks: [
    { id: 11, title: "کلاسیک", image: shortTshirt, category: "socks", slug: "socks-classic" },
    { id: 12, title: "ورزشی", image: longTshirt, category: "socks", slug: "socks-sport" },
  ],
  tunic: [
    { id: 13, title: "کلاسیک", image: shortTshirt, category: "tunic", slug: "tunic-classic" },
    { id: 14, title: "ورزشی", image: longTshirt, category: "tunic", slug: "tunic-sport" },
  ],
  blouse: [
    { id: 15, title: "کلاسیک", image: shortTshirt, category: "blouse", slug: "blouse-classic" },
    { id: 16, title: "ورزشی", image: longTshirt, category: "blouse", slug: "blouse-sport" },
  ],
  raincoat: [
    { id: 17, title: "کلاسیک", image: shortTshirt, category: "raincoat", slug: "raincoat-classic" },
    { id: 18, title: "ورزشی", image: longTshirt, category: "raincoat", slug: "raincoat-sport" },
  ],
  pants: [
    { id: 19, title: "کلاسیک", image: shortTshirt, category: "pants", slug: "pants-classic" },
    { id: 20, title: "ورزشی", image: longTshirt, category: "pants", slug: "pants-sport" },
  ],
  skirt: [
    { id: 21, title: "کلاسیک", image: shortTshirt, category: "skirt", slug: "skirt-classic" },
    { id: 22, title: "ورزشی", image: longTshirt, category: "skirt", slug: "skirt-sport" },
  ],
  coat: [
    { id: 23, title: "کلاسیک", image: shortTshirt, category: "coat", slug: "coat-classic" },
    { id: 24, title: "ورزشی", image: longTshirt, category: "coat", slug: "coat-sport" },
  ],
  shirt: [
    { id: 25, title: "کلاسیک", image: shortTshirt, category: "shirt", slug: "shirt-classic" },
    { id: 26, title: "ورزشی", image: longTshirt, category: "shirt", slug: "shirt-sport" },
  ],
  jeans: [
    { id: 27, title: "کلاسیک", image: shortTshirt, category: "jeans", slug: "jeans-classic" },
    { id: 28, title: "ورزشی", image: longTshirt, category: "jeans", slug: "jeans-sport" },
  ],
  suit: [
    { id: 29, title: "کلاسیک", image: shortTshirt, category: "suit", slug: "suit-classic" },
    { id: 30, title: "ورزشی", image: longTshirt, category: "suit", slug: "suit-sport" },
  ],
  shoes: [
    { id: 31, title: "کلاسیک", image: shortTshirt, category: "shoes", slug: "shoes-classic" },
    { id: 32, title: "ورزشی", image: longTshirt, category: "shoes", slug: "shoes-sport" },
  ],
  "baby-clothes": [
    { id: 33, title: "کلاسیک", image: shortTshirt, category: "baby-clothes", slug: "baby-clothes-classic" },
    { id: 34, title: "ورزشی", image: longTshirt, category: "baby-clothes", slug: "baby-clothes-sport" },
  ],
  "kids-shoes": [
    { id: 35, title: "کلاسیک", image: shortTshirt, category: "kids-shoes", slug: "kids-shoes-classic" },
    { id: 36, title: "ورزشی", image: longTshirt, category: "kids-shoes", slug: "kids-shoes-sport" },
  ],
  doll: [
    { id: 37, title: "کلاسیک", image: shortTshirt, category: "doll", slug: "doll-classic" },
    { id: 38, title: "ورزشی", image: longTshirt, category: "doll", slug: "doll-sport" },
  ],
  "kids-accessory": [
    { id: 39, title: "کلاسیک", image: shortTshirt, category: "kids-accessory", slug: "kids-accessory-classic" },
    { id: 40, title: "ورزشی", image: longTshirt, category: "kids-accessory", slug: "kids-accessory-sport" },
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
