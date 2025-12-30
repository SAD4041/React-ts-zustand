import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderSummary {
    totalItemsPrice: number;
    shippingCost: number;
    tax: number;
    finalTotal: number;
}

interface OrderSummarySectionProps {
    summary: OrderSummary;
    onCheckout: () => void;
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ summary, onCheckout }) => {
    return (
        <Card dir="rtl">
            <CardHeader>
                <CardTitle className="text-right">خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>مجموع قیمت کالاها</span>
                        <span>{summary.totalItemsPrice.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex justify-between">
                        <span>هزینه ارسال</span>
                        <span>{summary.shippingCost.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex justify-between">
                        <span>مالیات (۱۰%)</span>
                        <span>{summary.tax.toLocaleString()} تومان</span>
                    </div>
                    <div className="border-t border-border my-3 pt-3" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>مبلغ نهایی</span>
                        <span>{summary.finalTotal.toLocaleString()} تومان</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button
                        variant='default'
                        onClick={onCheckout}
                        className="w-50 max-w-x"
                    >
                        تکمیل پرداخت
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummarySection;