import { useState } from "react";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => setIsVisible(false);
  if (!isVisible) return null;

  return (
    <div className="hidden sm:flex bg-white border-b border-gray-100">
      <div dir="rtl" className="relative container mx-auto px-4 md:px-6 lg:px-8 py-2 text-center">
        <span className="text-sm text-gray-700">
          ۱۰ درصد تخفیف بیشتر از ۱ مرداد تا ۱۵ مهر!
        </span>
        <button
          onClick={handleClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="بستن"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;