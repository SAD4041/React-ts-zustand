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
        <Card dir="rtl" className="max-w-full min-w-[320px]">
            <CardHeader>
                <CardTitle className="text-right">خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-right">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>مجموع قیمت ها</span>
                        <span>{translateNumber(summary.totalItemsPrice.toLocaleString())} تومان</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>هزینه ارسال</span>
                        <span>{translateNumber(summary.shippingCost.toLocaleString())} تومان</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>مالیات (۱۰%)</span>
                        <span>{translateNumber(summary.tax.toLocaleString())} تومان</span>
                    </div>
                    <div className="border-t border-border my-3 pt-3" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 font-bold text-lg">
                        <span>هزینه نهایی</span>
                        <span>{translateNumber(summary.finalTotal.toLocaleString())} تومان</span>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to="/payment">
                        <Button className="w-full bg-secondary hover:secondary/80 text-white min-w-[160px] min-h-10">
                            تکمیل خرید
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummarySection;
