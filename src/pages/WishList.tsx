// components/WishlistPage.tsx

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/Product/ProductCard";
import { User } from "lucide-react";
import like from "@/assets/like.png";
import trash from "@/assets/Trash.png";
import shop from "@/assets/Shopping bag.png";
import { Button } from "@/components/ui/button";
import { getWishlist, removeWishlistItem, addToCart } from "@/services/wishListService";
import type {WishlistProduct} from "@/services/wishListService";
import type { ProductData } from "@/types/productCardTypes";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


const token = localStorage.getItem("token");
if (token) config.headers.Authorization = `Bearer ${token}`;

const WishlistPage: React.FC = () => {
    const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getWishlist();
                setWishlist(data);
            } catch (error) {
                console.error("Failed to load wishlist", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const displayedProducts = isExpanded ? wishlist : wishlist.slice(0, 8);

    const handleRemove = async (productId: number) => {
        try {
            await removeWishlistItem(productId);
            setWishlist(prev => prev.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Failed to remove item", error);
            // می‌تونی اینجا toast بذاری
        }
    };

    const handleAddToCart = async (productId: number) => {
        try {
            await addToCart(productId);
            alert("محصول به سبد خرید اضافه شد!");
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert("خطا در افزودن به سبد خرید");
        }
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div className="p-4 mb-[200px] mx-[150px] max-w-6xl mx-auto" dir="rtl">
            {/* هدر صفحه — بدون تغییر */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-backoround rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-text" />
                    </div>
                    <div>
                        <h1 className="text-xl text-titr font-bold">فاطمه رضایی</h1>
                        <p className="text-sm text-text">فاطمه جان خوش آمدی!</p>
                    </div>
                </div>
            </div>

            {/* کارت علاقمندی‌ها */}
            <div className="rounded-xl shadow-sm border border-border p-4">
                <div className="flex items-center mt-4 mb-8 px-4 gap-1">
                    <img src={like} className="h-10 w-10" alt="علاقمندی‌ها" />
                    <h2 className="text-xl font-semibold">علاقمندی ها</h2>
                </div>

                {/* گرید محصولات — حالا با ProductData */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 px-4">
                    {displayedProducts.map((product) => (
                        <div key={product.id} className="flex flex-col items-center">
                            <ProductCard product={product} />
                            <div className="flex gap-3 px-2 mt-3 w-full">
                                <Button
                                    className="flex-1 gap-2 bg-bg-addShop-btn text-titr rounded-lg text-xs font-medium hover:bg-card hover:text-text transition"
                                    onClick={() => handleAddToCart(product.id)}
                                >
                                    <img src={shop} className="h-6 w-6" alt="افزودن به سبد خرید" />
                                    افزودن به سبد خرید
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1 sm:flex-none w-10 p-0"
                                    onClick={() => handleRemove(product.id)}
                                >
                                    <img src={trash} className="h-6 w-6" alt="حذف" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* دکمه مشاهده همه — با wishlist */}
                {wishlist.length > 4 && (
                    <div className="flex justify-center pb-4">
                        <Button
                            className="px-6 py-2 border border-border rounded-lg text-sm font-medium transition"
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