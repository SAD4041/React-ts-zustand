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

export const menuItems: MenuItem[] = [
  {
    title: 'زنانه',
    image: dress,
    category: {
      categoryName: 'خرید لباس زنانه',
      itemsList: [
        { name: 'تیشرت', image: Tshirt, categorySlug: 'tshirt' },
        { name: 'جوراب', categorySlug: 'socks' },
        { name: 'تونیک', categorySlug: 'tunic' },
        { name: 'شومیز', categorySlug: 'blouse' },
        { name: 'بارانی', categorySlug: 'raincoat' },
        { name: 'شلوار', categorySlug: 'pants' },
        { name: 'دامن', categorySlug: 'skirt' },
        { name: 'پالتو', categorySlug: 'coat' },
      ],
    },
  },
  {
    title: 'مردانه',
    category: {
      categoryName: 'خرید لباس مردانه',
      itemsList: [
        { name: 'پیراهن', categorySlug: 'shirt' },
        { name: 'شلوار جین', categorySlug: 'jeans' },
        { name: 'کت و شلوار', categorySlug: 'suit' },
        { name: 'تیشرت', categorySlug: 'tshirt' },
        { name: 'کفش', categorySlug: 'shoes' },
      ],
    },
  },
  {
    title: 'بچه‌گانه',
    category: {
      categoryName: 'لباس بچه‌گانه',
      itemsList: [
        { name: 'لباس نوزاد', categorySlug: 'baby-clothes' },
        { name: 'کفش بچه', categorySlug: 'kids-shoes' },
        { name: 'عروسک', categorySlug: 'doll' },
        { name: 'اکسسوری', categorySlug: 'kids-accessory' },
      ],
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
