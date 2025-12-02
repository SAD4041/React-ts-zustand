import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "آیا میتوانم اطلاعات حساب کاربری خود را تغییر دهم؟",
      answer:
        "بله، شما می توانید در هر زمان وارد پنل کاربری خود شوید واطلاعات شخصی، آدرس، وتنظیمات حساب خود را به روزرسانی کنید.",
    },
    {
      question: "پرداخت آنلاین امن است؟",
      answer:
        "بله، تمامی تراکنش‌های مالی از طریق درگاه‌های بانکی معتبر و با استانداردهای امنیتی جهانی (SSL/TLS) انجام می‌شود. اطلاعات کارت شما در سرورهای ما ذخیره نمی‌شود.",
    },
    {
      question: "چگونه میتوانم کالا را مرجوع کنم؟",
      answer:
        "در صورت عدم رضایت از کالا، می‌توانید ظرف ۷ روز کاری پس از دریافت سفارش و با رعایت شرایط بازگشت (عدم استفاده و نقص فیزیکی)، درخواست بازگشت کالا را از طریق پنل کاربری ثبت کنید.",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 font-vazirmatn">
      <div className="text-center mb-10">
        <div className="inline-block bg-[#4ABBEB] text-white px-5 py-1.5 rounded-full text-sm font-medium mb-5">
          سوالات متداول
        </div>
        <h1 className="text-sm font-extrabold mb-3">چطور می‌توانیم کمک کنیم؟</h1>
        <p className="text-gray-600 text-sm">
          .پاسخ سوالات رایج خود را در اینجا پیدا کنید
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {["ارسال کالا", "بازگشت کالا", "پرداخت", "عمومی"].map(
          (category: string, index: number) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-xl text-sm cursor-pointer ${
                category === "عمومی"
                  ? "bg-[#7EC5F4] text-white shadow-xl shadow-[#7EC5F4]/40"
                  : "bg-white text-gray-700 border border-blue-100 shadow-xl shadow-blue-100/60"
              } transition-all duration-200`}
            >
              {category}
            </button>
          )
        )}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqData.map((item: FAQItem, index: number) => (
          <div
            key={index}
            className={`bg-[#F8F8F8] rounded-[20px] p-5 cursor-pointer transition-all duration-300 ${
              openIndex === index ? "shadow-xl" : "hover:shadow-lg"
            } shadow-[0_6px_12px_rgba(0,0,0,0.1)]`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center">
              <div
                className={`ml-3 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0088FF"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-800 text-right flex-grow">
                {item.question}
              </h3>
            </div>

            {openIndex === index && (
              <div className="mt-3 pt-3 border-t border-gray-300 text-gray-700 leading-relaxed text-sm text-right">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
