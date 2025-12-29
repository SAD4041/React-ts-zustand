// src/components/Home/CompleteProfileDialog.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompleteProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteProfileDialog: React.FC<CompleteProfileDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    onClose();
    navigate('/dash/profile-edit');
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            تکمیل پروفایل
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-4">
            برای استفاده بهتر از امکانات سایت، پروفایل خود را تکمیل کنید.
            <br />
            آیا می‌خواهید الان این کار را انجام دهید؟
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3 sm:justify-center">
          <Button
            type="button"
            variant="default"
            onClick={handleComplete}
            className="flex-1 sm:flex-initial bg-bg-section2 hover:bg-bg-section1 cursor-pointer"
          >
            بله، الان تکمیل می‌کنم
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="flex-1 sm:flex-initial cursor-pointer"
          >
            بعداً
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteProfileDialog;