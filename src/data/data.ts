import image1 from '@/assets/image1.png';
import type { Brand, ColorOption, SubCategory, Product } from '@/types/productListingTypes';
import type { ProductData, ImageData } from '@/types/productCardTypes';
// import shortTshirt from '@/assets/shortTshirt.jpg';
// import longTshirt from '@/assets/longTshirt.png';

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

import dress from '@/assets/dress.png'
import Tshirt from '@/assets/T-shirt.png'

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
  category: CategoryData;
};

export const menuItems: MenuItem[] = [
  {
    title: 'زنانه',
    image: dress,
    category: {
      categoryName: 'خرید لباس زنانه',
      itemsList: [
        { name: 'تیشرت', image: Tshirt },
        { name: 'جوراب',  },
        { name: 'تونیک',  },
        { name: 'شومیز',  },
        { name: 'بارانی' },
        { name: 'شلوار' },
        { name: 'دامن' },
        { name: 'پالتو' }
      ]
    }
  },
  {
    title: 'مردانه',
    category: {
      categoryName: 'خرید لباس مردانه',
      itemsList: [
        { name: 'پیراهن' },
        { name: 'شلوار جین' },
        { name: 'کت و شلوار' },
        { name: 'تیشرت' },
        { name: 'کفش' }
      ]
    }
  },
  {
    title: 'بچه‌گانه',
    category: {
      categoryName: 'لباس بچه‌گانه',
      itemsList: [
        { name: 'لباس نوزاد' },
        { name: 'کفش بچه' },
        { name: 'عروسک' },
        { name: 'اکسسوری' }
      ]
    }
  },
  {
    title: 'برند ها',
    category: {
      categoryName: 'برندهای محبوب',
      itemsList: [
        { name: 'Nike' },
        { name: 'Adidas' },
        { name: 'Zara' },
        { name: 'H&M' },
        { name: 'Gucci' }
      ]
    }
  }
];
