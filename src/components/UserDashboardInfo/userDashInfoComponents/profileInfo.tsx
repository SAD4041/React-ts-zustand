import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Input } from '@/components/ui/userDashInfo/input';
import { Label } from '@/components/ui/userDashInfo/label';
import * as yup from 'yup';
import type { UserInfo, ProfileInfoProps } from '@/types/UserDashInfoTypes';
import Separator from '@/components/ui/userDashInfo/separator';
import { translateNumber } from '@/utils/translateNumber';
import { untranslateNumber } from '@/utils/untranslateNumber';

const personalInfoSchema = yup.object({
  firstName: yup.string().required('نام نباید خالی باشد.'),
  lastName: yup.string().required('نام خانوادگی نباید خالی باشد.'),
  email: yup.string().email('فرمت ایمیل نامعتبر است.').required('ایمیل نباید خالی باشد.'),
  phone: yup.string().matches(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقمی و با 09 شروع شود.').required('شماره تلفن نباید خالی باشد.'),
  birthDate: yup.string().matches(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ باید YYYY/MM/DD باشد.').required('تاریخ تولد نباید خالی باشد.'),
});

type FormData = Omit<UserInfo, 'password'>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const ProfileInfo: React.FC<ProfileInfoProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    avatar: initialData.avatar,
    email: initialData.email,
    phone: initialData.phone,
    birthDate: initialData.birthDate,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const isValid = useMemo(() => {
    try {
      personalInfoSchema.validateSync(formData, { abortEarly: false });
      return true;
    } catch (err) {
      return false;
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target as { name: keyof FormData; value: string };

    // Normalize Persian digits to English for validation/storage
    if (name === 'phone' || name === 'birthDate') {
      value = untranslateNumber(value);
    }

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    try {
      personalInfoSchema.validateSync(newFormData, { abortEarly: false });
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
  };

  const handleSave = () => {
    if (isValid) {
      onSave({ ...formData });
    }
  };

  return (
    <Card className="p-6">
      <div dir="rtl">
        <div className="text-right mb-2">
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
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">نام خانوادگی</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="text-right"
            />
            {errors.lastName && <p className="text-sm text-danger">{errors.lastName}</p>}
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
            {errors.email && <p className="text-sm text-danger">{errors.email}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">شماره تماس</Label>
            <Input
              name="phone"
              value={translateNumber(formData.phone)}
              onChange={handleChange}
              className="text-right"
            />
            {errors.phone && <p className="text-sm text-danger">{errors.phone}</p>}
          </div>
          <div className="space-y-2 text-right">
            <Label className="block">تاریخ تولد</Label>
            <Input
              name="birthDate"
              value={translateNumber(formData.birthDate)}
              onChange={handleChange}
              className="text-right"
            />
            {errors.birthDate && <p className="text-sm text-danger">{errors.birthDate}</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 px-10">
        <Button onClick={handleSave} disabled={!isValid} variant="brand">
          ذخیره تغییرات
        </Button>
      </div>
    </Card>
  );
};

export default ProfileInfo;
