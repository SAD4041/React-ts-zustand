import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as yup from 'yup';
import { translateNumber } from '@/utils/translateNumber';
import { untranslateNumber } from "@/utils/untranslateNumber";

const contactInfoSchema = yup.object({
    fullName: yup.string().required('نام و نام خانوادگی نباید خالی باشد.'),
    phone: yup
        .string()
        .required('شماره تلفن نباید خالی باشد.')
        .test('phone-format', 'شماره تلفن باید ۱۱ رقمی و با 09 شروع شود.', (value) => {
            if (!value) return false;
            const cleaned = value.replace(/\D/g, ''); // فقط اعداد لاتین باقی می‌مونن
            return /^09\d{9}$/.test(cleaned);
        }),
    email: yup.string().email('فرمت ایمیل نامعتبر است.').required('ایمیل نباید خالی باشد.'),
});

type FormData = {
    fullName: string;
    phone: string; // ذخیره به صورت لاتین
    email: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

interface ContactInfoSectionProps {
    initialData?: FormData;
    onChange: (data: FormData) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ initialData, onChange }) => {
    const [formData, setFormData] = useState<FormData>({
        fullName: initialData?.fullName || '',
        phone: initialData?.phone || '',
        email: initialData?.email || '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target as { name: keyof FormData; value: string };

        if (name === 'phone') {
            // ۱. تبدیل اعداد فارسی به لاتین
            const latiValue = untranslateNumber(value);
            // ۲. حذف هر چیزی غیر از عدد لاتین
            value = latiValue.replace(/\D/g, '');
        }

        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        // اعتبارسنجی
        try {
            contactInfoSchema.validateSync(newFormData, { abortEarly: false });
            setErrors({});
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: FormErrors = {};
                err.inner.forEach((error) => {
                    if (error.path && error.message) {
                        newErrors[error.path as keyof FormData] = error.message;
                    }
                });
                setErrors(newErrors);
            }
        }

        // ارسال داده به والد (همیشه لاتین)
        onChange(newFormData);
    };

    return (
        <Card dir="rtl">
            <CardHeader>
                <CardTitle className="text-right">اطلاعات تماس</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-right">نام و نام خانوادگی</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="نام خود را وارد کنید..."
                            className="text-right w-full"
                        />
                        {errors.fullName && <p className="text-sm text-destructive text-right">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-right">شماره تماس</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={translateNumber(formData.phone)} // نمایش فارسی
                            onChange={handleChange}
                            placeholder="۰۹۰۰۰۰۰۰۰۰۰"
                            className="text-right w-full"
                        />
                        {errors.phone && <p className="text-sm text-destructive text-right">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-right">ایمیل</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="text-left dir-ltr w-full"
                        />
                        {errors.email && <p className="text-sm text-destructive text-right">{errors.email}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContactInfoSection;