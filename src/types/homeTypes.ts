export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    imageUrl: string;
    category: string;
    isAmazing?: boolean;
    rating?: number;
    inStock: boolean;
  }
  
  export interface Brand {
    id: number;
    name: string;
    logoUrl: string;
    slug: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
  }
  
  export interface Style {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
  }
  
  export interface HomePageData {
    banner: {
      imageUrl: string;
      title?: string;
      subtitle?: string;
    };
    categories: Category[];
    amazingProducts: Product[];
    bestSellingBrands: Brand[];
    stylePalettes: Style[];
  }