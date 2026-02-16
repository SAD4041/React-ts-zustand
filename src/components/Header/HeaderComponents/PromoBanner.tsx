import { useState } from "react";
import CloseIcon from "./closeIcon";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleClose = () => setIsVisible(false);
  if (!isVisible) return null;

  return (
    <div className="hidden sm:flex bg-background border-b border-border">
      <div dir="rtl" className="relative container mx-auto px-4 md:px-6 lg:px-8 py-2 text-center">
        <span className="text-sm text-foreground">
          ۱۰ درصد تخفیف بیشتر از ۱ مرداد تا ۱۵ مهر!
        </span>
        <button
          onClick={handleClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;