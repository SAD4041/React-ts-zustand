import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* عنوان بخش */}
      <div className="text-center mb-6">
        <div className="inline-block px-6 py-2 bg-[#4ABBEB] rounded-full text-white font-bold text-lg">
          ارتباط با ما
        </div>
      </div>

      {/* متن راهنمایی */}
      <div className="text-center mb-8">
        <p className="text-gray-800 text-lg font-bold mb-1">
          با ما در ارتباط باشید.
        </p>
        <p className="text-gray-600 text-base">
          از طریق راه های زیر می‌توانید با ما در تماس باشید.
        </p>
      </div>

      {/* کارت‌های ارتباطی — ترتیب از چپ به راست: ساعت کاری، آدرس، ایمیل، تماس تلفنی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {/* کارت ساعت کاری دفتر */}
        <div className="bg-white rounded-xl shadow-xl p-6 flex items-start justify-between">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-gray-800 text-lg mb-2">ساعت کاری دفتر</h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">
              شنبه تا پنجشنبه: ۸ صبح تا ۶ بعدازظهر<br/>
              جمعه: ۸ صبح تا ۲ بعدازظهر<br/>
              تعطیل: سه‌شنبه
            </p>
          </div>
          <div className="w-12 h-12 bg-[#D384E9] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 4m0 0V8m0 8a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        {/* کارت آدرس دفتر مرکزی */}
        <div className="bg-white rounded-xl shadow-xl p-6 flex items-start justify-between">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-gray-800 text-lg mb-2">آدرس دفتر مرکزی</h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">
              خیابان شریعتی، کوچه ۱۰، پلاک ۲۵<br/>
              تهران - ایران<br/>
              کد پستی: ۱۴۶۷۸۹۱۲۳۴
            </p>
          </div>
          <div className="w-12 h-12 bg-[#FF8787] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* کارت ایمیل */}
        <div className="bg-white rounded-xl shadow-xl p-6 flex items-start justify-between">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-gray-800 text-lg mb-2">ایمیل</h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">
              info@example.com<br/>
              support@example.com
            </p>
          </div>
          <div className="w-12 h-12 bg-[#6C9CF3] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z" />
            </svg>
          </div>
        </div>

        {/* کارت تماس تلفنی */}
        <div className="bg-white rounded-xl shadow-xl p-6 flex items-start justify-between">
          <div className="flex-1 text-right">
            <h3 className="font-bold text-gray-800 text-lg mb-2">تماس تلفنی</h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">
              +۹۸-۲۱-۱۲۳۴۵۶۷۸<br/>
              +۹۸-۹۱۲-۹۸۷۶۵۴۳
            </p>
          </div>
          <div className="w-12 h-12 bg-[#7ADCAA] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L1.764 7.65A2 2 0 013 5zm10 0a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L11.764 7.65A2 2 0 0113 5zm10 0a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.764.882a2 2 0 01-1.604.845 2 2 0 01-1.604-.845L21.764 7.65A2 2 0 0123 5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
