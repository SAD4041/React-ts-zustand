// src/components/Custom/modal.tsx
import React, { useEffect } from "react";

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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6">
            {imageSrc && (
              <div className="flex justify-center mb-4">
                <img src={imageSrc} alt="modal-icon" className="w-28 h-auto" />
              </div>
            )}

            {title && (
              <h3 className="text-center text-lg font-semibold text-slate-900 mb-2">
                {title}
              </h3>
            )}

            {message && (
              <p className="text-center text-sm text-slate-600 mb-4">
                {message}
              </p>
            )}

            <div className="mt-2 flex justify-center">
              <button
                onClick={() => {
                  onButtonClick?.();
                }}
                className="w-3/4 inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-800 transition"
              >
                {buttonText}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;