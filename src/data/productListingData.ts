import shortTshirt from '@/assets/shortTshirt.jpg';
import longTshirt from '@/assets/longTshirt.png';
// import image1 from '@/assets/image1.png';
import type { Brand, ColorOption, SubCategory} from '@/types/productListingTypes';
// import {productData} from "@/data/productcardData";

export  const productsPerPage = 4;
export  const pagesPerGroup = 5;
export  const productsPerGroup = productsPerPage * pagesPerGroup;
export  const currentCategory = "تیشرت زنانه";

export const categoryLabels: Record<string, string> = {
  tshirt: "تیشرت",
  shirt: "پیراهن",
  shoes: "کفش",
  pants: "شلوار",
  dress: "لباس مجلسی",
  bag: "کیف",
};

export const brandLabels: Record<string, string> = {
  nike: "نایکی",
  adidas: "آدیداس",
  puma: "پوما",
  reebok: "ریبوک",
};

export const sorts = [
    { value: 'most-revelent', label: 'مرتبط ترین' },
    { value: 'newest', label: 'جدیدترین' },
    { value: 'most-salled', label: 'پرفروش ترین' },
    { value: 'cheapest', label: 'ارزان ترین' },
    { value: 'expensive', label: 'گران ترین' },
    { value: 'chosen', label: 'منتخب' }
  ];


export const subCategories: SubCategory[] = [
  {
    id: 1,
    title: "تیشرت آستین بلند زنانه",
    image: longTshirt
  },
  {
    id: 2,
    title: "تیشرت آستین کوتاه زنانه",
    image: shortTshirt
  },
    {
    id: 3,
    title: "تیشرت آستین بلند زنانه",
    image: longTshirt
  },
  {
    id: 4,
    title: "تیشرت آستین کوتاه زنانه",
    image: shortTshirt
  },
  {
    id: 5,
    title: "تیشرت آستین بلند زنانه",
    image: longTshirt
  },
  {
    id: 6,
    title: "تیشرت آستین کوتاه زنانه",
    image: shortTshirt
  },
    {
    id: 7,
    title: "تیشرت آستین بلند زنانه",
    image: longTshirt
  },
  {
    id: 8,
    title: "تیشرت آستین کوتاه زنانه",
    image: shortTshirt
  },
    {
    id: 9,
    title: "تیشرت آستین بلند زنانه",
    image: longTshirt
  },
  {
    id: 10,
    title: "تیشرت آستین کوتاه زنانه",
    image: shortTshirt
  },
];

export const brands: Brand[] = [
  { id: 1, name: "Prada", slug: "پرادا" },
  { id: 2, name: "ZARA", slug: "زارا" },
  { id: 3, name: "Dior", slug: "دیور" },
  { id: 4, name: "Loius Vuitton", slug: "لویی ویتون" },
  { id: 5, name: "Mango", slug: "منگو" },
  { id: 6, name: "Adidas", slug: "آدیداس" },
  { id: 7, name: "Nike", slug: "نایک" },
  { id: 8, name: "Puma", slug: "پوما" }
];

export const sizes: string[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export const colors: ColorOption[] = [
  { name: "آبی", code: "#007BFF" },
  { name: "صورتی", code: "#FF6B6B" },
  { name: "سبز", code: "#228B22" },
  { name: "مشکی", code: "#000000" },
  { name: "سفید", code: "#FFFFFF" },
  { name: "زرد", code: "#FFD700" },
  { name: "نارنجی", code: "#FF8C00" },
  { name: "قرمز", code: "#DC3545" },
  { name: "خاکستری", code: "#6C757D" },
  { name: "بنفش", code: "#9B59B6" }
];

