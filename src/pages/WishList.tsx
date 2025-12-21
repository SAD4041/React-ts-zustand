// components/WishlistPage.tsx

import React, {useState} from "react";
import ProductCard from "@/components/Product/ProductCard";
import { User } from "lucide-react";
import like from "@/assets/like.png";
import { Button } from "@/components/ui/button";

// نوع داده‌های محصول
type Product = {
    id: number;
    image: string;
    name: string;
    brand: string;
    price: number;
    discount?: number;
    stock: number;
    colors: string[];
    sizes: string[];
};

const WishlistPage: React.FC = () => {
    // داده‌های ساختگی برای ۸ محصول (چون در تصویر ۸ تا محصول دیده می‌شه)
    const products: Product[] = [
        {
            id: 1,
            image: "/images/product1.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 5,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 2,
            image: "/images/product2.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 8,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 3,
            image: "/images/product3.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 3,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 4,
            image: "/images/product4.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 12,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 5,
            image: "/images/product5.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 7,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 6,
            image: "/images/product6.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 2,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 7,
            image: "/images/product7.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 15,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        },
        {
            id: 8,
            image: "/images/product8.png",
            name: "تیشرت Bussiness Not Boomin",
            brand: "CATWAREHOUSE",
            price: 699999,
            discount: 20,
            stock: 4,
            colors: ["#FF5733", "#33FF57", "#3357FF"],
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
        }
    ];
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // ✅ انتخاب محصولات برای نمایش
    const displayedProducts = isExpanded
        ? products // همه محصولات
        : products.slice(0, 4); // فقط ۴ تا اول

    return (
        <div className="p-4 mb-[200px] mx-[150px] max-w-6xl mx-auto" dir="rtl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-text" />
                    </div>
                    {/* create 2 avatar for men, women */}

                    <div>
                        <h1 className="text-xl text-titr font-bold">فاطمه رضایی</h1>
                        <p className="text-sm text-text">فاطمه جان خوش آمدی!</p>
                    </div>
                </div>
            </div>

            {/* کارت علاقمندی ها */}
            <div className="rounded-xl shadow-sm border border-border p-4">
                {/* هدر کارت */}
                <div className="flex items-center mt-4 mb-8 px-4 gap-1">
                    <img src={like} className="h-10 w-10" alt="علاقمندی‌ها" />
                    <h2 className="text-xl font-semibold">علاقمندی ها</h2>
                </div>

                {/* گرید محصولات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 px-4">
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* دکمه مشاهده همه / نمایش کمتر */}
                {products.length > 4 && (
                    <div className="flex justify-center pb-4">
                        <Button
                            className="px-6 py-2 border border-border rounded-lg text-sm font-medium transition cursor-pointer"
                            onClick={toggleExpand}
                        >
                            {isExpanded ? "نمایش کمتر" : "مشاهده همه"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;