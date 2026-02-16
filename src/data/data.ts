import dress from '@/assets/dress.png';
import Tshirt from '@/assets/T-shirt.png';

export type DropdownItem = {
  name: string;
  image?: string;
  categorySlug?: string;
  brandSlug?: string;
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

const commonCategories: DropdownItem[] = [
  { name: 'تیشرت', image: Tshirt, categorySlug: 'tshirt' },
  { name: 'شلوار', categorySlug: 'pants' },
  { name: 'پلیور', categorySlug: 'pullover' },
  { name: 'لباس گرم', categorySlug: 'warm-clothes' },
  { name: 'اکسسوری', categorySlug: 'accessory' },
];

export const menuItems: MenuItem[] = [
  {
    title: 'زنانه',
    image: dress,
    category: {
      categoryName: 'خرید لباس زنانه',
      itemsList: commonCategories,
    },
  },
  {
    title: 'مردانه',
    category: {
      categoryName: 'خرید لباس مردانه',
      itemsList: commonCategories,
    },
  },
  {
    title: 'بچه‌گانه',
    category: {
      categoryName: 'لباس بچه‌گانه',
      itemsList: commonCategories,
    },
  },
  {
    title: 'برند ها',
    category: {
      categoryName: 'برندهای محبوب',
      itemsList: [
        { name: 'Nike', brandSlug: 'nike' },
        { name: 'Adidas', brandSlug: 'adidas' },
        { name: 'Zara', brandSlug: 'zara' },
        { name: 'H&M', brandSlug: 'h-m' },
        { name: 'Gucci', brandSlug: 'gucci' },
      ],
    },
  },
];
