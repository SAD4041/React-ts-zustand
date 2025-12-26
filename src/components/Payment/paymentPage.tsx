import React, { useState } from 'react';
import ContactInfoSection from '@/components/Payment/paymentComponents/contactInfoSec';
import AddressSection from '@/components/Payment/paymentComponents/addressSection';
import ShippingMethodSection from '@/components/Payment/paymentComponents/shipingMethodSection';
import OrderSummarySection from '@/components/Payment/paymentComponents/orderSummerySection';
import { MapPin } from 'lucide-react';

const mockAddresses = [
    {
        id: '1',
        title: 'خانه',
        province: 'تهران',
        city: 'تهران',
        postalCode: '1234567890',
        fullAddress: 'میدان ونک، برج سپهر، طبقه ۱۵',
        isDefault: true,
    },
    {
        id: '2',
        title: 'محل کار',
        province: 'تهران',
        city: 'تهران',
        postalCode: '0987654321',
        fullAddress: 'خیابان ولیعصر، پلاک ۱۲۳، واحد ۵',
        isDefault: false,
    },
];

const shippingMethods = [
    {
        id: 'standard',
        name: 'ارسال عادی',
        duration: '۳-۵ روز کاری',
        price: 30000,
        isActive: true,
    },
    {
        id: 'express',
        name: 'ارسال سریع',
        duration: '۱-۲ روز کاری',
        price: 90000,
        isActive: true,
    },
    {
        id: 'cashOnDelivery',
        name: 'ارسال رایگان',
        duration: 'برای سفارش‌های بالای مبلغ مشخص',
        price: 0,
        description: 'حداقل مبلغ برای ارسال رایگان: ۱,۰۰۰,۰۰۰ تومان',
        isActive: false, // فعال نیست
    },
];

const orderSummary = {
    totalItemsPrice: 300000000,
    shippingCost: 30000,
    tax: 27000000,
    finalTotal: 327300000,
};

const PaymentsPage: React.FC = () => {
    const [contactInfo, setContactInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
    });

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string | null>(null);

    // تابع‌های مدیریت آدرس
    const handleAddAddress = (newAddress: any) => {
        console.log('Add Address:', newAddress);
        // در واقعیت، اینجا API را فراخوانی می‌کنیم
    };

    const handleUpdateAddress = (id: string, updatedAddress: any) => {
        console.log(`Update Address ${id}:`, updatedAddress);
    };

    const handleDeleteAddress = (id: string) => {
        console.log(`Delete Address ${id}`);
    };

    // تابع پرداخت نهایی
    const handleCheckout = () => {
        if (!selectedAddressId || !selectedShippingMethodId) {
            alert('لطفاً آدرس و روش ارسال را انتخاب کنید.');
            return;
        }
        console.log('Checkout Data:', {
            contactInfo,
            selectedAddressId,
            selectedShippingMethodId,
            orderSummary,
        });
        // ارسال داده‌ها به API
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div dir="rtl" className="flex">
                <MapPin className="w-6 h-6 ml-2" />
                <h1 className="text-xl font-bold">تسویه حساب</h1>
            </div>

            {/* بخش اطلاعات تماس */}
            <ContactInfoSection
                initialData={contactInfo}
                onChange={(data) => setContactInfo(data)}
            />

            {/* بخش آدرس‌ها */}
            <AddressSection
                addresses={mockAddresses}
                onAddAddress={handleAddAddress}
                onUpdateAddress={handleUpdateAddress}
                onDeleteAddress={handleDeleteAddress}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
            />

            {/* بخش روش ارسال */}
            <ShippingMethodSection
                methods={shippingMethods}
                selectedMethodId={selectedShippingMethodId}
                onSelectMethod={setSelectedShippingMethodId}
            />

            {/* بخش خلاصه سفارش */}
            <OrderSummarySection
                summary={orderSummary}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

export default PaymentsPage;