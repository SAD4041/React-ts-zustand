// src/components/Cart/OrderSummarySection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { translateNumber } from '@/utils/translateNumber';
interface OrderSummary {
    totalItemsPrice: number;
    shippingCost: number;
    tax: number;
    finalTotal: number;
}

interface OrderSummarySectionProps {
    summary: OrderSummary;
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ summary }) => {
    return (
        <Card dir="rtl">
            <CardHeader>
                <CardTitle className="text-right">خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-right">
                    <div className="flex justify-between">
                        <span>مجموع قیمت ها</span>
                        <span>{translateNumber(summary.totalItemsPrice.toLocaleString())} تومان</span>
                    </div>
                    <div className="flex justify-between">
                        <span>هزینه ارسال</span>
                        <span>{translateNumber(summary.shippingCost.toLocaleString())} تومان</span>
                    </div>
                    <div className="flex justify-between">
                        <span>مالیات (۱۰%)</span>
                        <span>{translateNumber(summary.tax.toLocaleString())} تومان</span>
                    </div>
                    <div className="border-t border-border my-3 pt-3" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>هزینه نهایی</span>
                        <span>{translateNumber(summary.finalTotal.toLocaleString())} تومان</span>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to="/payments">
                        <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                            تکمیل خرید
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummarySection;