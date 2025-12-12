import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Input } from '@/components/ui/userDashInfo/input';
import { Label } from '@/components/ui/userDashInfo/label';
import { z } from 'zod';
import type { UserInfo, ProfileInfoProps } from '@/types/UserDashInfoTypes';
import Separator from '@/components/ui/userDashInfo/separator';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'نام نباید خالی باشد.'),
  lastName: z.string().min(1, 'نام خانوادگی نباید خالی باشد.'),
  email: z.string().email('فرمت ایمیل نامعتبر است.'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقمی و با 09 شروع شود.'),
  nationalCode: z.string().regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقمی باشد.'),
  birthDate: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ باید YYYY/MM/DD باشد.'),
  shabaNumber: z.string().regex(/^\d{10}$/, 'شماره شبا باید ۱۰ رقمی باشد.')
});


const ProfileInfo: React.FC<ProfileInfoProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<Omit<UserInfo, 'password'>>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    avatar: initialData.avatar,
    email: initialData.email,
    phone: initialData.phone,
    nationalCode: initialData.nationalCode,
    birthDate: initialData.birthDate,
    shabaNumber: initialData.shabaNumber,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<UserInfo, 'password'>, string>>>({});

  const isValid = useMemo(() => {
    return personalInfoSchema.safeParse(formData).success;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    try {
      personalInfoSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (e: any) {
      setErrors(prev => ({ ...prev, [name]: e.errors?.[0]?.message || 'خطا' }));
    }
  };

  const handleSave = () => {
    if (isValid) {
      onSave({ ...formData });
    }
  };

  return (
    <Card className="p-6">
      <div dir="rtl">
        <div className="text-right mb-2 ">
          <h3 className="text-lg font-semibold">اطلاعات شخصی</h3>
        </div>
        <Separator className="mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-20 px-10">
          <div className="space-y-2 text-right">
            <Label className="block">نام</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="text-right"
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">نام خانوادگی</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="text-right"
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">ایمیل</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="text-left dir-ltr"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">شماره تماس</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-right"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">تاریخ تولد</Label>
            <Input
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="text-right"
            />
            {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">کد ملی</Label>
            <Input
              name="nationalCode"
              value={formData.nationalCode}
              onChange={handleChange}
              className="text-right"
            />
            {errors.nationalCode && <p className="text-sm text-red-500">{errors.nationalCode}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">شماره شبا</Label>
            <Input
              name="shabaNumber"
              value={formData.shabaNumber}
              onChange={handleChange}
              className="text-right"
            />
            {errors.shabaNumber && <p className="text-sm text-red-500">{errors.shabaNumber}</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 px-10">
        <Button
          onClick={handleSave}
          disabled={!isValid}
          className="bg-[#00A6D4] hover:bg-[#00A6D4]/60 text-white"
        >
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
  );
};

export default ProfileInfo;