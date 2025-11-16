import image1 from '@/assets/image1.png';
import type { Brand, ColorOption, SubCategory, Product } from '@/types/productListingTypes';
import type { ProductData } from '@/types/productCardTypes';
import shortTshirt from '@/assets/shortTshirt.jpg';
import longTshirt from '@/assets/longTshirt.png';

export const productData: ProductData = {
  discount: 24,
  hasDiscount: true,
  image : image1,
  model: 'CATWAREHOUSE',
  name: 'Bussiness Not Boomin',
  price: 699999,
  discountedPrice: 0,
  rating: 4.2,
  stock: 1,
  ratingCount: 502,
  sales: 150,
  sizes: [
    { label: 'S' },
    { label: 'M' },
    { label: 'L' },
    { label: 'XL' },
    { label: '2XL' },
    { label: '3XL' },
  ],
  colors: [
    { hex: '#FFB6C1', label: 'Pink' },
    { hex: '#228B22', label: 'Green' },
    { hex: '#000000', label: 'Black' },
    { hex: '#FFFFFF', label: 'White' },
  ],
};

productData.discountedPrice = Math.floor(productData.price - (productData.price * productData.discount / 100));

export type DropdownItem = {
  name: string;
  image?: string;
};

export type CategoryData = {
  categoryName: string;
  itemsList: DropdownItem[];
};

export type MenuItem = {
  title: string;
  image?: string;
  category?: {
    categoryName: string;
    itemsList: { name: string; image?: string }[];
  };
};





//=========================================================


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


export const products: Product[] = [
  {
    id: 1,
    ...productData,
    image: image1,
    name: 'تیشرت آستین بلند زنانه CATWAREHOUSE',
    model: 'CATWAREHOUSE',
    sales: 200,
    colors: [
      { hex: '#FFB6C1', label: 'صورتی' },
      { hex: '#228B22', label: 'سبز' },
    ]
  },
  {
    id: 2,
    ...productData,
    image: image1,
    name: 'تیشرت آستین کوتاه زنانه CATWAREHOUSE',
    model: 'CATWAREHOUSE',
    stock: 5,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#FFFFFF', label: 'سفید' },
    ]
  },
  {
    id: 3,
    ...productData,
    image: image1,
    name: 'تیشرت آستین بلند مردانه',
    model: 'ZARA',
    sales: 450,
    price: 550000,
    discountedPrice: Math.floor(550000 * 0.8),
    stock: 12,
    colors: [
      { hex: '#007BFF', label: 'آبی' },
      { hex: '#DC3545', label: 'قرمز' },
    ]
  },
  {
    id: 4,
    ...productData,
    image: image1,
    name: 'هودی مردانه Nike Classic',
    model: 'Nike',
    price: 890000,
    sales: 300,
    discountedPrice: Math.floor(890000 * 0.9),
    stock: 15,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#808080', label: 'خاکستری' }
    ]
  },
  {
    id: 5,
    ...productData,
    image: image1,
    name: 'پیراهن مردانه H&M Slim Fit',
    model: 'H&M',
    price: 720000,
    discountedPrice: Math.floor(720000 * 0.85),
    stock: 8,
    colors: [
      { hex: '#FFFFFF', label: 'سفید' },
      { hex: '#000080', label: 'سرمه‌ای' }
    ]
  },
  {
    id: 6,
    ...productData,
    image: image1,
    name: 'شلوار جین زنانه ZARA BlueLine',
    model: 'ZARA',
    price: 980000,
    discountedPrice: Math.floor(980000 * 0.75),
    stock: 10,
    colors: [
      { hex: '#1E90FF', label: 'آبی جین' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 7,
    ...productData,
    image: image1,
    name: 'دامن بلند زنانه Mango Elegant',
    model: 'Mango',
    price: 650000,
    sales: 100,
    discountedPrice: Math.floor(650000 * 0.8),
    stock: 6,
    colors: [
      { hex: '#FFC0CB', label: 'صورتی' },
      { hex: '#FFD700', label: 'طلایی' }
    ]
  },
  {
    id: 8,
    ...productData,
    image: image1,
    name: 'کاپشن مردانه Adidas WinterPro',
    model: 'Adidas',
    price: 1650000,
    discountedPrice: Math.floor(1650000 * 0.85),
    stock: 9,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#A52A2A', label: 'قهوه‌ای' }
    ]
  },
  {
    id: 9,
    ...productData,
    image: image1,
    name: 'پلیور زنانه Bershka SoftTouch',
    model: 'Bershka',
    price: 740000,
    sales: 249,
    discountedPrice: Math.floor(740000 * 0.9),
    stock: 14,
    colors: [
      { hex: '#800080', label: 'بنفش' },
      { hex: '#FF69B4', label: 'صورتی پررنگ' }
    ]
  },
  {
    id: 10,
    ...productData,
    image: image1,
    name: 'تاپ ورزشی زنانه Puma Active',
    model: 'Puma',
    price: 520000,
    discountedPrice: Math.floor(520000 * 0.9),
    stock: 18,
    colors: [
      { hex: '#FF4500', label: 'نارنجی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 11,
    ...productData,
    image: image1,
    name: 'کت مردانه Massimo Dutti Formal',
    model: 'Massimo Dutti',
    price: 1950000,
    sales: 300,
    discountedPrice: Math.floor(1950000 * 0.9),
    stock: 5,
    colors: [
      { hex: '#2F4F4F', label: 'ذغالی' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 12,
    ...productData,
    image: image1,
    name: 'لباس مجلسی زنانه Mango Shine',
    model: 'Mango',
    price: 1250000,
    sales: 410,
    discountedPrice: Math.floor(1250000 * 0.85),
    stock: 7,
    colors: [
      { hex: '#FFD700', label: 'طلایی' },
      { hex: '#C0C0C0', label: 'نقره‌ای' }
    ]
  },
  {
    id: 13,
    ...productData,
    image: image1,
    name: 'شلوارک ورزشی مردانه Nike AirFlex',
    model: 'Nike',
    price: 430000,
    sales: 560,
    discountedPrice: Math.floor(430000 * 0.9),
    stock: 20,
    colors: [
      { hex: '#808080', label: 'خاکستری' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 14,
    ...productData,
    image: image1,
    name: 'بلوز زنانه ZARA Comfort',
    model: 'ZARA',
    price: 570000,
    discountedPrice: Math.floor(570000 * 0.8),
    stock: 12,
    colors: [
      { hex: '#FFC0CB', label: 'صورتی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 15,
    ...productData,
    image: image1,
    name: 'پالتو مردانه Pull&Bear WinterLine',
    model: 'Pull&Bear',
    price: 2100000,
    discountedPrice: Math.floor(2100000 * 0.85),
    stock: 4,
    colors: [
      { hex: '#654321', label: 'قهوه‌ای تیره' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 16,
    ...productData,
    image: image1,
    name: 'دامن کوتاه زنانه Bershka Modern',
    model: 'Bershka',
    price: 590000,
    discountedPrice: Math.floor(590000 * 0.85),
    stock: 9,
    colors: [
      { hex: '#FF1493', label: 'صورتی پررنگ' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 17,
    ...productData,
    image: image1,
    name: 'پیراهن مردانه Zara CasualFit',
    model: 'Zara',
    price: 770000,
    sales: 650,
    discountedPrice: Math.floor(770000 * 0.9),
    stock: 11,
    colors: [
      { hex: '#6495ED', label: 'آبی روشن' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 18,
    ...productData,
    image: image1,
    name: 'هودی زنانه H&M Cozy',
    model: 'H&M',
    price: 880000,
    sales: 360,
    discountedPrice: Math.floor(880000 * 0.9),
    stock: 10,
    colors: [
      { hex: '#800080', label: 'بنفش' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 19,
    ...productData,
    image: image1,
    name: 'تاپ مردانه Adidas FitDry',
    model: 'Adidas',
    price: 480000,
    discountedPrice: Math.floor(480000 * 0.9),
    stock: 15,
    colors: [
      { hex: '#0000FF', label: 'آبی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 20,
    ...productData,
    image: image1,
    name: 'کت زنانه Mango Classic',
    model: 'Mango',
    price: 1320000,
    discountedPrice: Math.floor(1320000 * 0.85),
    stock: 7,
    colors: [
      { hex: '#708090', label: 'خاکستری ملایم' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 21,
    ...productData,
    image: image1,
    name: 'شلوار مردانه Levi’s Regular',
    model: 'Levi’s',
    price: 970000,
    sales: 90,
    discountedPrice: Math.floor(970000 * 0.8),
    stock: 10,
    colors: [
      { hex: '#2F4F4F', label: 'ذغالی' },
      { hex: '#1E90FF', label: 'آبی جین' }
    ]
  },
  {
    id: 22,
    ...productData,
    image: image1,
    name: 'شلوار زنانه Pull&Bear Comfort',
    model: 'Pull&Bear',
    price: 910000,
    discountedPrice: Math.floor(910000 * 0.85),
    stock: 8,
    colors: [
      { hex: '#708090', label: 'خاکستری' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 23,
    ...productData,
    image: image1,
    name: 'کاپشن زنانه ZARA WarmLine',
    model: 'ZARA',
    price: 1750000,
    discountedPrice: Math.floor(1750000 * 0.85),
    stock: 6,
    colors: [
      { hex: '#A52A2A', label: 'قهوه‌ای' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 24,
    ...productData,
    image: image1,
    name: 'پلیور مردانه Bershka WinterFit',
    model: 'Bershka',
    price: 690000,
    discountedPrice: Math.floor(690000 * 0.9),
    stock: 9,
    colors: [
      { hex: '#DC143C', label: 'قرمز' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 25,
    ...productData,
    image: image1,
    name: 'لباس راحتی زنانه H&M HomeFit',
    model: 'H&M',
    price: 540000,
    sales: 20,
    discountedPrice: Math.floor(540000 * 0.9),
    stock: 20,
    colors: [
      { hex: '#FFC0CB', label: 'صورتی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 26,
    ...productData,
    image: image1,
    name: 'ژاکت مردانه Massimo Classic',
    model: 'Massimo Dutti',
    price: 1100000,
    discountedPrice: Math.floor(1100000 * 0.9),
    stock: 6,
    colors: [
      { hex: '#808080', label: 'خاکستری' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 27,
    ...productData,
    image: image1,
    name: 'تیشرت مردانه Puma FitDry',
    model: 'Puma',
    price: 490000,
    sales: 45,
    discountedPrice: Math.floor(490000 * 0.9),
    stock: 15,
    colors: [
      { hex: '#FF4500', label: 'نارنجی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 28,
    ...productData,
    image: image1,
    name: 'دامن زنانه Mango LightFlow',
    model: 'Mango',
    price: 670000,
    discountedPrice: Math.floor(670000 * 0.85),
    stock: 11,
    colors: [
      { hex: '#FFDAB9', label: 'هلویی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 29,
    ...productData,
    image: image1,
    name: 'پیراهن مردانه Levi’s Casual',
    model: 'Levi’s',
    price: 800000,
    discountedPrice: Math.floor(800000 * 0.9),
    stock: 8,
    colors: [
      { hex: '#2E8B57', label: 'سبز' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 30,
    ...productData,
    image: image1,
    name: 'پالتو زنانه ZARA WinterCozy',
    model: 'ZARA',
    price: 1900000,
    sales: 2,
    discountedPrice: Math.floor(1900000 * 0.85),
    stock: 5,
    colors: [
      { hex: '#808080', label: 'خاکستری' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 31,
    ...productData,
    image: image1,
    name: 'شلوارک زنانه H&M RelaxFit',
    model: 'H&M',
    price: 420000,
    discountedPrice: Math.floor(420000 * 0.9),
    stock: 14,
    colors: [
      { hex: '#F5DEB3', label: 'بژ' },
      { hex: '#FFC0CB', label: 'صورتی' }
    ]
  },
  {
    id: 32,
    ...productData,
    image: image1,
    name: 'هودی مردانه Adidas Urban',
    model: 'Adidas',
    price: 960000,
    sales: 208,
    discountedPrice: Math.floor(960000 * 0.9),
    stock: 8,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#1E90FF', label: 'آبی' }
    ]
  },
  {
    id: 33,
    ...productData,
    image: image1,
    name: 'تیشرت زنانه Mango SummerFit',
    model: 'Mango',
    price: 520000,
    discountedPrice: Math.floor(520000 * 0.9),
    stock: 14,
    colors: [
      { hex: '#FFC0CB', label: 'صورتی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 34,
    ...productData,
    image: image1,
    name: 'پیراهن زنانه Bershka Classic',
    model: 'Bershka',
    price: 830000,
    discountedPrice: Math.floor(830000 * 0.85),
    stock: 10,
    colors: [
      { hex: '#FFD700', label: 'طلایی' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 35,
    ...productData,
    image: image1,
    name: 'کاپشن زنانه Pull&Bear CozyFit',
    model: 'Pull&Bear',
    price: 1490000,
    discountedPrice: Math.floor(1490000 * 0.85),
    stock: 6,
    colors: [
      { hex: '#A52A2A', label: 'قهوه‌ای' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 36,
    ...productData,
    image: image1,
    name: 'شلوار مردانه ZARA FitStyle',
    model: 'ZARA',
    price: 880000,
    discountedPrice: Math.floor(880000 * 0.9),
    stock: 9,
    colors: [
      { hex: '#2F4F4F', label: 'ذغالی' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 37,
    ...productData,
    image: image1,
    name: 'پیراهن مردانه Levi’s Smart',
    model: 'Levi’s',
    price: 790000,
    discountedPrice: Math.floor(790000 * 0.9),
    stock: 10,
    colors: [
      { hex: '#1E90FF', label: 'آبی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  },
  {
    id: 38,
    ...productData,
    image: image1,
    name: 'بلوز زنانه Mango LightTouch',
    model: 'Mango',
    price: 670000,
    sales: 350,
    discountedPrice: Math.floor(670000 * 0.9),
    stock: 12,
    colors: [
      { hex: '#FFB6C1', label: 'صورتی' },
      { hex: '#F5DEB3', label: 'بژ' }
    ]
  },
  {
    id: 39,
    ...productData,
    image: image1,
    name: 'ژاکت مردانه Bershka WinterSoft',
    model: 'Bershka',
    price: 990000,
    discountedPrice: Math.floor(990000 * 0.85),
    stock: 8,
    colors: [
      { hex: '#808080', label: 'خاکستری' },
      { hex: '#000000', label: 'مشکی' }
    ]
  },
  {
    id: 40,
    ...productData,
    image: image1,
    name: 'تاپ زنانه H&M SimpleFit',
    model: 'H&M',
    price: 440000,
    sales: 845,
    discountedPrice: Math.floor(440000 * 0.9),
    stock: 15,
    colors: [
      { hex: '#FFFFFF', label: 'سفید' },
      { hex: '#FFB6C1', label: 'صورتی' }
    ]
  },
  {
    id: 41,
    ...productData,
    image: image1,
    name: 'کت مردانه Massimo Elegant',
    model: 'Massimo Dutti',
    price: 1850000,
    discountedPrice: Math.floor(1850000 * 0.9),
    stock: 5,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#2F4F4F', label: 'ذغالی' }
    ]
  },
  {
    id: 42,
    ...productData,
    image: image1,
    name: 'کاپشن مردانه Nike Shield',
    model: 'Nike',
    price: 1580000,
    sales: 840,
    discountedPrice: Math.floor(1580000 * 0.85),
    stock: 8,
    colors: [
      { hex: '#000000', label: 'مشکی' },
      { hex: '#1E90FF', label: 'آبی' }
    ]
  },
  {
    id: 43,
    ...productData,
    image: image1,
    name: 'پلیور زنانه ZARA CozyFit',
    model: 'ZARA',
    price: 790000,
    sales: 60,
    discountedPrice: Math.floor(790000 * 0.9),
    stock: 10,
    colors: [
      { hex: '#FFC0CB', label: 'صورتی' },
      { hex: '#FFFFFF', label: 'سفید' }
    ]
  }
];

