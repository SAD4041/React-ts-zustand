import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/userDashInfo/button';
import { Input } from '@/components/ui/userDashInfo/input';
import { Label } from '@/components/ui/userDashInfo/label';
import ToggleSwitch from '@/components/ui/userDashInfo/toggleSwitch';
import { X } from 'lucide-react';
import type { Address, AddressFormModalProps } from '@/types/UserDashInfoTypes';

const AddressFormModal: React.FC<AddressFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<Omit<Address, 'id'> & { id?: string }>({
    title: '',
    province: '',
    city: '',
    postalCode: '',
    phone: '',
    fullAddress: '',
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        province: '',
        city: '',
        postalCode: '',
        phone: '',
        fullAddress: '',
        isDefault: false,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div dir='rtl' className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-right mb-6">
          {initialData ? 'ویرایش آدرس' : 'آدرس جدید'}
        </h2>

        <div className="space-y-4 text-right">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className='mb-3'>شهر</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="text-right dir-rtl"
              />
            </div>
            <div>
              <Label className='mb-3'>استان</Label>
              <Input
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="text-right dir-rtl"
              />
            </div>
            <div>
              <Label className='mb-3'>کد پستی</Label>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="text-right dir-rtl"
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div>
              <Label className='mb-3'>شماره تماس</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-right dir-rtl"
              />
            </div>
            <div>
              <Label className='mb-3'>عنوان</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="text-right dir-rtl"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <ToggleSwitch
                checked={formData.isDefault}
                onChange={() => setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }))}
                label="پیش‌فرض"
              />
            </div>
          </div>

          <div>
            <Label className='mb-3'>آدرس کامل</Label>
            <Input
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              className="text-right dir-rtl"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="sm"
            className="bg-[#00A6D4] hover:bg-[#00A6D4]/60 text-white"
            onClick={handleSubmit}
          >
            {initialData ? 'ذخیره تغییرات' : 'افزودن'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressFormModal;