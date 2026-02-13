import bannerFallback from "@/assets/banner.jpg";
import category1 from "@/assets/category/category1.png";
import category2 from "@/assets/category/category2.png";
import category3 from "@/assets/category/category3.png";
import category4 from "@/assets/category/category4.png";
import category5 from "@/assets/category/category5.png";
import category6 from "@/assets/category/category6.png";

import style1 from "@/assets/styles/style1.jpg";
import style2 from "@/assets/styles/style2.jpg";
import style3 from "@/assets/styles/style3.jpg";
import style4 from "@/assets/styles/style4.jpg";
import classic from "@/assets/styles/classic.png"
import sport from "@/assets/styles/sport.png"
import street from "@/assets/styles/street.png"
import vintage from "@/assets/styles/vintage.png"

import adidas from '@/assets/brands/Adidas-Logo.wine.png';
import dior from '@/assets/brands/Christian_Dior_(fashion_house)-Logo.wine.png';
import balenciaga from '@/assets/brands/Balenciaga-Logo.wine.png';
import chanel from '@/assets/brands/Chanel-Logo.wine.png';
import zara from '@/assets/brands/Zara_(retailer)-Logo.wine.png';
import louisVuitton from '@/assets/brands/Louis_Vuitton-Logo.wine.png';
import burberry from '@/assets/brands/Burberry-Logo.wine.png';
import fendi from '@/assets/brands/Fendi-Logo.wine.png';
import nike from '@/assets/brands/Nike,_Inc.-Logo.wine.png';
import gucci from '@/assets/brands/Gucci-Logo.wine.png';



export const fallbackCategories = [
    { id: 1, name: "تیشرت", slug: "tshirt", image_url: category1 },
    { id: 2, name: "پلیور", slug: "sweater", image_url: category2 },
    { id: 3, name: "لباس زنانه", slug: "women", image_url: category3 },
    { id: 4, name: "شلوار", slug: "pants", image_url: category4 },
    { id: 5, name: "لباس گرم", slug: "winter-wear", image_url: category5 },
    { id: 6, name: "اکسسوری", slug: "accessories", image_url: category6 },
];

export const fallbackBanners: Banner[] = [
    { id: 1, image_url: bannerFallback },
    { id: 2, image_url: bannerFallback },
    { id: 3, image_url: bannerFallback },
];


export const fallbackStylePalettes = [
    { id: 1, title: "کلاسیک", slug: "classic", image_url: style1 },
    { id: 2, title: "اسپرت", slug: "sport", image_url: style2 },
    { id: 3, title: "وینتیج", slug: "vintage", image_url: style3 },
    { id: 4, title: "بوهو", slug: "boho", image_url: style4 },
];
export const modelImages = [
  classic, sport, street, vintage,
];

export const brands = [
    { name: "Adidas", logo: adidas },
    { name: "Dior", logo: dior },
    { name: "Balenciaga", logo: balenciaga },
    { name: "Chanel", logo: chanel },
    { name: "Zara", logo: zara },
    { name: "Louis Vuitton", logo: louisVuitton },
    { name: "Burberry", logo: burberry },
    { name: "Fendi", logo: fendi },
    { name: "Nike", logo: nike },
    { name: "Gucci", logo: gucci }
];