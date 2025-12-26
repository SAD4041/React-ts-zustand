// src/components/Payments/ShippingMethodSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ToggleSwitch from '@/components/ui/toggleSwitch'; // ✅ کامپوننت سفارشی تو

interface ShippingMethod {
    id: string;
    name: string;
    duration: string;
    price: number;
    isActive: boolean;
}

interface ShippingMethodSectionProps {
    methods: ShippingMethod[];
    selectedMethodId: string | null;
    onSelectMethod: (id: string) => void;
}

const ShippingMethodSection: React.FC<ShippingMethodSectionProps> = ({
    methods,
    selectedMethodId,
    onSelectMethod,
}) => {
    return (
        <Card dir="rtl">
            <CardHeader>
                <CardTitle className="text-right">روش ارسال</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {methods
                        .filter((m) => m.isActive)
                        .map((method) => (
                            <div
                                key={method.id}
                                className="p-4 border border-border rounded-md flex items-start justify-between"
                            >
                                <div className="flex-1 text-right">
                                    <h4 className="font-medium">{method.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{method.duration}</p>
                                    <p className="font-semibold mt-2">
                                        هزینه: {method.price.toLocaleString()} تومان
                                    </p>
                                </div>
                                <div className="mr-2">
                                    <ToggleSwitch
                                        checked={selectedMethodId === method.id}
                                        onChange={() => onSelectMethod(method.id)}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ShippingMethodSection;