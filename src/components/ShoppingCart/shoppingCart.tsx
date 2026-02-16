import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ShoppingBag from "@/assets/Shopping bag.png"
import { translateNumber } from '@/utils/translateNumber';
import CartItemsSection from './ItemSection';
import OrderSummarySection from './OrderSummerySection';

export const mockCartItems = [
    {
        id: '1',
        name: 'تیشرت مینیمال',
        color: 'مشکی',
        size: 'L',
        price: 900000,
        quantity: 1,
        image: 'https://via.placeholder.com/150?text=Tshirt',
    },
    {
        id: '2',
        name: 'شلوار جین',
        color: 'مشکی',
        size: 'XL',
        price: 1200000,
        quantity: 4,
        image: 'https://via.placeholder.com/150?text=Jeans',
    },
    {
        id: '3',
        name: 'شلوار جین',
        color: 'مشکی',
        size: 'XL',
        price: 1200000,
        quantity: 4,
        image: 'https://via.placeholder.com/150?text=Jeans',
    },
    {
        id: '4',
        name: 'شلوار جین',
        color: 'مشکی',
        size: 'XL',
        price: 1200000,
        quantity: 4,
        image: 'https://via.placeholder.com/150?text=Jeans',
    },
    {
        id: '5',
        name: 'شلوار جین',
        color: 'مشکی',
        size: 'XL',
        price: 1200000,
        quantity: 4,
        image: 'https://via.placeholder.com/150?text=Jeans',
    },
];

const calculateSummary = (items: any[]) => {
    const totalItemsPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = 30000;
    const tax = Math.round(totalItemsPrice * 0.1);
    const finalTotal = totalItemsPrice + shippingCost + tax;
    return { totalItemsPrice, shippingCost, tax, finalTotal };
};

const ShoppingCartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState(mockCartItems);

    const handleRemoveItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(
            cartItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const summary = calculateSummary(cartItems);

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 space-y-8 w-full min-w-[320px]">
            <div dir="rtl" className="flex">
                <img src={ShoppingBag} className="h-6 w-6 ml-2" />
                <h1 className="text-xl font-bold">تسویه حساب</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card dir="rtl" className="max-w-full min-w-[320px]">
                        <CardHeader>
                            <CardTitle className="text-right font-bold text-xl"> ({translateNumber(cartItems.length)} محصول)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CartItemsSection
                                items={cartItems}
                                onRemove={handleRemoveItem}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <OrderSummarySection summary={summary} />
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;
