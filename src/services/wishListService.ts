// src/services/wishlistService.ts

import { getData, postData, deleteData } from "./services";
import type { ProductData } from "@/types/productCardTypes";

export type WishlistProduct = ProductData;

export const getWishlist = async (): Promise<WishlistProduct[]> => {
	const data = await getData({
		endPoint: "/api/wishlist", // ⚠️ مسیر واقعی API خودتان را جایگزین کنید
	});
	return data; // فرض می‌کنیم API آرایه‌ای از محصولات را می‌دهد
};

export const removeWishlistItem = async (productId: number): Promise<void> => {
	await deleteData({
		endPoint: `/api/wishlist/${productId}`, // مسیر واقعی حذف — مثلاً /wishlist/remove یا /wishlist?id=...
	});
};

export const addToCart = async (productId: number): Promise<void> => {
	await postData({
		endPoint: "/api/cart", // مسیر افزودن به سبد — مثلاً /cart/add
		data: { productId },   // بسته به نیاز بک‌اند: ممکنه فقط id باشه یا {...}
	});
};