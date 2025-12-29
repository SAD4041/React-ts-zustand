import React, { useState } from "react";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("عمومی");

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ["عمومی", "پرداخت", "بازگشت کالا", "ارسال کالا"];

  const faqData: Record<string, { question: string; answer: string }[]> = {
    عمومی: [
      {
        question: "آیا میتوانم اطلاعات حساب کاربری خود را تغییر دهم؟",
        answer:
          "بله، شما می توانید در هر زمان وارد پنل کاربری خود شوید واطلاعات شخصی، آدرس، وتنظیمات حساب خود را به روزرسانی کنید.",
      },
      {
        question: "چگونه میتوانم کالا را مرجوع کنم؟",
        answer:
          "در صورت عدم رضایت از کالا، می‌توانید ظرف ۷ روز کاری پس از دریافت سفارش و با رعایت شرایط بازگشت (عدم استفاده و نقص فیزیکی)، درخواست بازگشت کالا را از طریق پنل کاربری ثبت کنید. پس از تأیید درخواست، پیک مربوطه کالا را از آدرس شما دریافت خواهد کرد.",
      },
      {
        question: "آیا پشتیبانی 24 ساعته دارید؟",
        answer: "بله، تیم پشتیبانی ما در طول 24 ساعت شبانه‌روز، 7 روز هفته پاسخگوی شماست.",
      },
    ],
    پرداخت: [
      {
        question: "چه روش‌های پرداختی پشتیبانی می‌شود؟",
        answer:
          "ما از پرداخت‌های آنلاین از طریق تمامی کارت‌های بانکی شتاب، پرداخت در محل (کارت به کارت)، و همچنین پرداخت با کیف پول الکترونیکی پشتیبانی می‌کنیم.",
      },
      {
        question: "آیا می‌توانم پس از پرداخت، روش پرداخت را تغییر دهم؟",
        answer:
          "در صورتی که سفارش هنوز ارسال نشده باشد، می‌توانید با تماس با پشتیبانی، درخواست تغییر روش پرداخت را ثبت کنید.",
      },
      {
        question: "در صورت ناموفق بودن پرداخت، چه اتفاقی می‌افتد؟",
        answer:
          "در صورت ناموفق بودن پرداخت، مبلغ کسر شده ظرف 72 ساعت به حساب شما بازگردانده می‌شود و می‌توانید دوباره تلاش کنید.",
      },
    ],
    "بازگشت کالا": [
      {
        question: "شرایط بازگشت کالا چیست؟",
        answer:
          "کالا باید در شرایط اولیه، با بسته‌بندی اصلی، بدون استفاده و نقص فیزیکی باشد. بازگشت باید ظرف 7 روز کاری از تاریخ دریافت سفارش انجام شود.",
      },
      {
        question: "هزینه بازگشت کالا بر عهده چه کسی است؟",
        answer:
          "در صورتی که بازگشت به دلیل خطا در ارسال یا نقص کالا باشد، هزینه برگشت بر عهده فروشگاه است. در غیر این صورت، هزینه برگشت بر عهده مشتری خواهد بود.",
      },
      {
        question: "چه مدت زمانی تا بازگشت مبلغ طول می‌کشد؟",
        answer:
          "پس از تأیید دریافت کالا و بررسی وضعیت آن، مبلغ بازگشتی ظرف 3 تا 5 روز کاری به حساب شما واریز می‌شود.",
      },
    ],
    "ارسال کالا": [
      {
        question: "زمان تحویل سفارش چقدر است؟",
        answer:
          "در تهران معمولاً سفارشات ظرف 24 تا 48 ساعت و در سایر شهرها ظرف 2 تا 5 روز کاری تحویل داده می‌شوند.",
      },
      {
        question: "آیا امکان دریافت سفارش در آدرس‌های مختلف وجود دارد؟",
        answer:
          "بله، شما می‌توانید در هر سفارش، آدرس تحویل را به دلخواه مشخص کنید. همچنین امکان ارسال به دو آدرس مختلف در یک سفارش وجود دارد.",
      },
      {
        question: "چگونه می‌توانم وضعیت ارسال سفارش خود را پیگیری کنم؟",
        answer:
          "پس از ارسال سفارش، کد رهگیری به شما ارسال می‌شود که می‌توانید از طریق پنل کاربری یا وبسایت پست ایران، وضعیت سفارش را پیگیری کنید.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 font-sans" dir="rtl">
      <div className="text-center mb-10">
        <div className="inline-block bg-[#E4004B] text-white px-5 py-1.5 rounded-full text-sm font-medium mb-5">
          سوالات متداول
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">
          چطور می‌توانیم کمک کنیم؟
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          پاسخ سوالات رایج خود را در اینجا پیدا کنید
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveCategory(category);
              setOpenIndex(null);
            }}
            className={`px-6 py-3 rounded-2xl text-sm md:text-base font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-[#ED775A] text-white shadow-2xl shadow-[#ED775A]/40 hover:shadow-[#ED775A]/50 active:scale-[0.98]"
                : "bg-white text-gray-900 shadow-xl shadow-[#ED775A]/25 hover:shadow-2xl hover:shadow-[#ED775A]/30 hover:bg-gray-50 active:scale-[0.98]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqData[activeCategory].map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300 ${
              openIndex === index
                ? "shadow-lg shadow-[#ED775A]/20"
                : "shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-[#ED775A]/15"
            }`}
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
                  stroke="#ED775A"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 flex-grow">
                {item.question}
              </h3>
            </div>

            {openIndex === index && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600 leading-relaxed text-sm md:text-base">
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
