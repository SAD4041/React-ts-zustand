import { useEffect, useState } from "react";

export function Banner() {
  const [activeIndex, setActiveIndex] = useState(0); 

  const images = [
    "/Img/IMG_9188.JPG", 
    "/Img/IMG_9187.JPG",
    "/Img/IMG_9188.JPG",
    "/Img/IMG_9185.JPG",
  ];

  const total = images.length;


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % total); // به اسلاید بعدی برو
    }, 10000); // 10000 میلی‌ثانیه = 10 ثانیه

    // پاک کردن تایمر هنگام unmount کامپوننت
    return () => clearInterval(interval);
  }, []);

  // کلاس نقاط اسلایدها
  const getDotClass = (index: number) => {
    const diff = Math.abs(index - activeIndex);

    if (diff === 0) {
      // active
      return "h-4 w-4 border-2 border-black bg-white";
    }

    if (diff === 1) {
      // neighbors
      return "h-3 w-3 border-2 border-black bg-gray-300";
    }

    // far
    return "h-2 w-2 border-2 border-black bg-gray-200";
  };

  return (
    <div className="px-4 pt-3">
      <div className="relative h-40 w-full overflow-hidden rounded-2xl border-2 border-black bg-gray-100 shadow-md">
        {/* عکس اسلاید */}
        <img
          src={images[activeIndex]} // استفاده از تصویر از فولدر public
          alt={`Slide ${activeIndex + 1}`}
          className="h-full w-full object-cover rounded-2xl transition-all duration-500 ease-in-out"
        />

        {/* دایره‌های نمایش وضعیت اسلاید */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`rounded-full ${getDotClass(i)} transition-all duration-200`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
