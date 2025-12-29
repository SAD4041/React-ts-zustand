import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center px-10 py-3 contact-pill text-white rounded-full font-bold text-xl shadow-md">
            ارتباط با ما
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-gray-900 text-lg font-bold mb-2">با ما در ارتباط باشید.</p>
          <p className="text-gray-600 text-base">
            از طریق راه‌های زیر می‌توانید با ما در تماس باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#7ADCAA] rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L1.764 7.65A2 2 0 013 5zm10 0a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L11.764 7.65A2 2 0 0113 5zm10 0a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L21.764 7.65A2 2 0 0123 5z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">تلفن تماس</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              ۰۲۱-۱۲۳۴۵۶۷۸
              <br />
              ۰۹۱۲-۱۲۳۴۵۶۷
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#6C9CF3] rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">ایمیل</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              info@example.com
              <br />
              support@example.com
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#FF8787] rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">آدرس دفتر مرکزی</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              تهران، خیابان ولیعصر
              <br />
              پلاک ۱۲۳، طبقه ۴
              <br />
              کد پستی: ۱۲۳۴۵۶۷۸۹۰
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.12)] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#D384E9] rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 4m0 0V8m0 8a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">ساعات کاری دفتر</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر
              <br />
              پنج‌شنبه: ۹ صبح تا ۱۲ بعدازظهر
              <br />
              جمعه تعطیل
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
