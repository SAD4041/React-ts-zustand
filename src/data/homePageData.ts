import bannerFallback from "@/assets/banner.jpg";
import category1 from "@/assets/category/category1.png";
import category2 from "@/assets/category/category2.png";
import category3 from "@/assets/category/category3.png";
import category4 from "@/assets/category/category4.png";
import category5 from "@/assets/category/category5.png";
import category6 from "@/assets/category/category6.png";
import style1 from "@/assets/style1.jpg";
import style2 from "@/assets/style2.jpg";
import style3 from "@/assets/style3.jpg";
import style4 from "@/assets/style4.jpg";

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