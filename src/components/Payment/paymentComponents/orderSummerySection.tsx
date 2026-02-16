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
        <Card dir="rtl" className="max-w-full min-w-[320px]">
            <CardHeader>
                <CardTitle className="text-right">جزئیات سفارش</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>مجموع قیمت کالاها</span>
                        <span>{summary.totalItemsPrice.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>هزینه ارسال</span>
                        <span>{summary.shippingCost.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span>مالیات (۹٪)</span>
                        <span>{summary.tax.toLocaleString()} تومان</span>
                    </div>
                    <div className="border-t border-border my-3 pt-3" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 font-bold text-lg">
                        <span>مبلغ نهایی پرداخت</span>
                        <span>{summary.finalTotal.toLocaleString()} تومان</span>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-end">
                    <Button
                        variant='default'
                        onClick={onCheckout}
                        className="w-full sm:w-auto min-w-[160px] min-h-10"
                    >
                        ادامه پرداخت
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummarySection;
