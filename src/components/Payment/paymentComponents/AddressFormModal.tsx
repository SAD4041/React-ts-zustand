import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ToggleSwitch from '@/components/ui/toggleSwitch';
import { X } from 'lucide-react';

export type AddressFormData = {
  title: string;
  province: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  isDefault: boolean;
};

export type Address = {
  id: string;
  userId: string;
  title: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  isDefault: boolean;
};


export interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: AddressFormData) => void;
  initialData?: AddressFormData | null;
}

const AddressFormModal: React.FC<AddressFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    title: '',
    province: '',
    city: '',
    postalCode: '',
    fullAddress: '',
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        province: initialData.province,
        city: initialData.city,
        postalCode: initialData.postalCode,
        fullAddress: initialData.fullAddress,
        isDefault: initialData.isDefault,
      });
    } else {
      setFormData({
        title: '',
        province: '',
        city: '',
        postalCode: '',
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md min-w-[320px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-right mb-6">
          {initialData ? 'ویرایش آدرس' : 'آدرس جدید'}
        </h2>

        <div className="space-y-4 text-right">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <Label className='mb-3'>شهر</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="text-right dir-rtl min-h-10"
              />
            </div>
            <div>
              <Label className='mb-3'>استان</Label>
              <Input
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="text-right dir-rtl min-h-10"
              />
            </div>
            <div>
              <Label className='mb-3'>کد پستی</Label>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="text-right dir-rtl min-h-10"
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div>
              <Label className='mb-3'>عنوان</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="text-right dir-rtl min-h-10"
              />
            </div>
            <div className="flex items-end">
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
              className="text-right dir-rtl min-h-12"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand-hover min-w-[150px] min-h-10"
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
