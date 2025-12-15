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