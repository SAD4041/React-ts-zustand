import React, { useState } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Input } from '@/components/ui/userDashInfo/input';
import { Label } from '@/components/ui/userDashInfo/label';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import Separator from '@/components/ui/userDashInfo/separator';

const passwordSchema = z
  .string()
  .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد.')
  .regex(/[A-Z]/, 'حداقل یک حرف بزرگ انگلیسی')
  .regex(/[a-z]/, 'حداقل یک حرف کوچک انگلیسی')
  .regex(/\d/, 'حداقل یک عدد')
  .regex(/[^A-Za-z0-9]/, 'حداقل یک کاراکتر خاص (!@#$%)');

interface ChangePasswordProps {
  currentPassword: string;
  onSave: (newPassword: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ currentPassword, onSave }) => {
  const [pwd, setPwd] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [errors, setErrors] = useState({ current: '', new: '', confirm: '' });

  const validateCurrent = (value: string) => {
    if (value !== currentPassword) {
      setErrors(prev => ({ ...prev, current: 'رمز عبور فعلی اشتباه است.' }));
    } else {
      setErrors(prev => ({ ...prev, current: '' }));
    }
  };

  const validateNew = (value: string) => {
    try {
      passwordSchema.parse(value);
      setErrors(prev => ({ ...prev, new: '' }));
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.message ||
        error?.message ||
        'خطا در رمز عبور';
      setErrors(prev => ({ ...prev, new: message }));
    }
  };

  const validateConfirm = (value: string) => {
    if (value !== pwd.new) {
      setErrors(prev => ({ ...prev, confirm: 'رمز عبور‌ها مطابقت ندارند.' }));
    } else {
      setErrors(prev => ({ ...prev, confirm: '' }));
    }
  };

  const handleChange = (field: keyof typeof pwd) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(prev => ({ ...prev, [field]: value }));
    if (field === 'current') validateCurrent(value);
    if (field === 'new') validateNew(value);
    if (field === 'confirm') validateConfirm(value);
  };

  const handleSubmit = () => {
    validateCurrent(pwd.current);
    validateNew(pwd.new);
    validateConfirm(pwd.confirm);
    if (!errors.current && !errors.new && !errors.confirm && pwd.new) {
      onSave(pwd.new);
    }
  };

  const isValid = !errors.current && !errors.new && !errors.confirm && pwd.new;

  return (
    <Card className="p-6">
      <div className="text-right mb-3">
        <h3 className="text-xl font-semibold">تغییر رمز عبور</h3>
      </div>
      <Separator className="mb-6" />
      <div className="space-y-4 pb-10 px-10">
        <div className="space-y-2 text-right relative">
          <Label className="block">رمز عبور فعلی</Label>
          <div className="relative">
            <Input
              type={show.current ? "text" : "password"}
              value={pwd.current}
              onChange={handleChange('current')}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.current && <p className="text-sm text-red-500">{errors.current}</p>}
        </div>
        <div className="space-y-2 text-right relative">
          <Label className="block">رمز عبور جدید</Label>
          <div className="relative">
            <Input
              type={show.new ? "text" : "password"}
              value={pwd.new}
              onChange={handleChange('new')}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.new && <p className="text-sm text-red-500">{errors.new}</p>}
        </div>
        <div className="space-y-2 text-right relative">
          <Label className="block">تکرار رمز عبور جدید</Label>
          <div className="relative">
            <Input
              type={show.confirm ? "text" : "password"}
              value={pwd.confirm}
              onChange={handleChange('confirm')}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirm && <p className="text-sm text-red-500">{errors.confirm}</p>}
        </div>
      </div>

      <div className="mt-6 px-10">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-[#00A6D4] hover:bg-[#00A6D4]/60 text-white"
        >
          تغییر رمز عبور
        </Button>
      </div>
    </Card>
  );
};

export default ChangePassword;