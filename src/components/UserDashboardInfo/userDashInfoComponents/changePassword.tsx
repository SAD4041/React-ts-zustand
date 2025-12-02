import React, { useState } from 'react';
import { Card } from '@/components/ui/userDashInfo/card';
import { Button } from '@/components/ui/userDashInfo/button';
import { Input } from '@/components/ui/userDashInfo/input';
import { Label } from '@/components/ui/userDashInfo/label';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

const passwordSchema = z
  .string()
  .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد.')
  .regex(/[A-Z]/, 'حداقل یک حرف بزرگ انگلیسی')
  .regex(/[a-z]/, 'حداقل یک حرف کوچک انگلیسی')
  .regex(/\d/, 'حداقل یک عدد')
  .regex(/[^A-Za-z0-9]/, 'حداقل یک کاراکتر خاص (!@#$%)');

const ChangePasswordSection: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const [newError, setNewError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const mockCurrent = 'OldPass123!';

  const validateCurrent = (value: string) => {
    if (value !== mockCurrent) {
      setCurrentError('رمز عبور فعلی اشتباه است.');
    } else {
      setCurrentError('');
    }
  };

  const validateNew = (value: string) => {
    try {
      passwordSchema.parse(value);
      setNewError('');
    } catch (e: any) {
      setNewError(e.errors[0]?.message || 'خطا در رمز عبور');
    }
  };

  const validateConfirm = (value: string) => {
    if (value !== newPassword) {
      setConfirmError('رمز عبور‌ها مطابقت ندارند.');
    } else {
      setConfirmError('');
    }
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    validator: (v: string) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setter(val);
    validator(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCurrent(currentPassword);
    validateNew(newPassword);
    validateConfirm(confirmPassword);

    if (!currentError && !newError && !confirmError && newPassword) {
      console.log('رمز عبور جدید:', newPassword);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-right text-lg font-semibold">تغییر رمز عبور</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-right relative">
          <Label className="block">رمز عبور فعلی</Label>
          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={handleChange(setCurrentPassword, validateCurrent)}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {currentError && <p className="text-sm text-red-500">{currentError}</p>}
        </div>
        <div className="space-y-2 text-right relative">
          <Label className="block">رمز عبور جدید</Label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={handleChange(setNewPassword, validateNew)}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {newError && <p className="text-sm text-red-500">{newError}</p>}
        </div>
        <div className="space-y-2 text-right relative">
          <Label className="block">تکرار رمز عبور جدید</Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword, validateConfirm)}
              className="text-right dir-rtl pl-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmError && <p className="text-sm text-red-500">{confirmError}</p>}
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-[#007BFF] hover:bg-[#0069d9] text-white">
            تغییر رمز عبور
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChangePasswordSection;