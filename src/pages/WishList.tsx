// components/WishlistPage.tsx

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/Product/ProductCard";
import { User } from "lucide-react";
import like from "@/assets/like.png";
import trash from "@/assets/Trash.png";
import shop from "@/assets/Shopping bag.png";
import { Button } from "@/components/ui/button";
import { getWishlist, removeWishlistItem, addToCart } from "@/services/wishListService";
import type { WishlistProduct } from "@/services/wishListService";
import type { ProductData } from "@/types/productCardTypes";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useUserStore from "@/store/userStore/userStore";

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // دریافت اطلاعات کاربر از store
  const user = useUserStore((state) => state.user);

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

  // نمایش حداکثر 4 یا همه
  const displayedProducts = isExpanded ? wishlist : wishlist.slice(0, 4);

  // حذف محصول از لیست علاقه‌مندی‌ها
  const handleRemove = async (productId: number) => {
    try {
      await removeWishlistItem(productId);
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Failed to remove item", error);
      alert("خطا در حذف محصول");
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

  // گرفتن حرف اول نام (اگر avatar نباشه)
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.mobile) {
      return user.mobile.charAt(0);
    }
    return "U";
  };

  // نام نمایشی کاربر
  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.mobile) return user.mobile;
    return "کاربر";
  };

  // در حین لودینگ
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 mb-[200px] mx-[150px] max-w-6xl mx-auto" dir="rtl">
      {/* هدر صفحه با اطلاعات واقعی کاربر */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* نمایش avatar یا حرف اول نام */}
          {user?.avatar ? (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-backoround flex items-center justify-center">
              <img
                src={user.avatar}
                alt={getDisplayName()}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-backoround rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-titr">
                {getUserInitial()}
              </span>
            </div>
          )}
          
          <div>
            <h1 className="text-xl text-titr font-bold">{getDisplayName()}</h1>
            <p className="text-sm text-text">
              {user?.name ? `${user.name} جان خوش آمدی!` : "خوش آمدید!"}
            </p>
          </div>
        </div>
      </div>

      {/* کارت علاقمندی‌ها */}
      <div className="rounded-xl shadow-sm border border-border p-4">
        <div className="flex items-center mt-4 mb-8 px-4 gap-1">
          <img src={like} className="h-10 w-10" alt="علاقمندی‌ها" />
          <h2 className="text-xl font-semibold">علاقمندی ها</h2>
        </div>

        {/* اگر لیست خالی باشه */}
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text text-lg">لیست علاقه‌مندی‌های شما خالی است!</p>
            <p className="text-text text-sm mt-2">
              محصولات مورد علاقه خود را اضافه کنید
            </p>
          </div>
        ) : (
          <>
            {/* گرید محصولات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 px-4">
              {displayedProducts.map((product) => (
                <div key={product.id} className="flex flex-col items-center">
                  <ProductCard product={product} />
                  <div className="flex gap-3 px-2 mt-3 w-full">
                    <Button
                      className="flex-1 gap-2 bg-bg-addShop-btn text-titr rounded-lg text-xs font-medium hover:bg-card hover:text-text transition cursor-pointer"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <img
                        src={shop}
                        className="h-6 w-6"
                        alt="افزودن به سبد خرید"
                      />
                      افزودن به سبد خرید
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 sm:flex-none w-10 p-0 cursor-pointer"
                      onClick={() => handleRemove(product.id)}
                    >
                      <img src={trash} className="h-6 w-6" alt="حذف" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* دکمه مشاهده همه */}
            {wishlist.length > 4 && (
              <div className="flex justify-center pb-4">
                <Button
                  className="px-6 py-2 border border-border rounded-lg text-sm font-medium transition cursor-pointer"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "نمایش کمتر" : "مشاهده همه"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
