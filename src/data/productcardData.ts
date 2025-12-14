import image1 from '@/assets/image1.png';
import type { ProductData } from '@/types/productCardTypes';

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





