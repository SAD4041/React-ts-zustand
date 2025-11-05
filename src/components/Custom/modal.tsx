// src/components/Custom/modal.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  imageSrc?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "باشه",
  onButtonClick,
  imageSrc,
}) => {
  const handleButtonClick = () => {
    onButtonClick?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm w-[90%]">
        <DialogHeader>
          {imageSrc && (
            <div className="flex justify-center mb-4">
              <img src={imageSrc} alt="modal-icon" className="w-28 h-auto" />
            </div>
          )}
          
          {title && (
            <DialogTitle className="text-center text-lg">
              {title}
            </DialogTitle>
          )}
          
          {message && (
            <DialogDescription className="text-center text-sm">
              {message}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleButtonClick}
            className="w-3/4 inline-flex items-center justify-center rounded-lg bg-black text-white px-6 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {buttonText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;