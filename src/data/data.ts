import image1 from '@/assets/image1.png';

export interface ImageData {
  title: string;
  image: string;
}

export const images: ImageData[] = [
  {
    title: 'Tshirt',
    image: image1
  }
];

export interface Size {
  label: string;
}

export interface Color {
  hex: string;
  label: string;
}

export interface ProductData {
  discount: number;
  hasDiscount: boolean;
  model: string;
  name: string;
  price: number;
  discountedPrice: number;
  sizes: Size[];
  colors: Color[];
  rating: number;
  stock: number;
  ratingCount: number;
}

export const productData: ProductData = {
  discount: 24,
  hasDiscount: true,
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
