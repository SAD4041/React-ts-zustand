import { Target, Heart, Award, Users } from 'lucide-react';

export default function App() {
  const stats = [
    { number: '+۵', label: 'فروشگاه و برند فعال' },
    { number: '+۱۰۰', label: 'فروش' },
    { number: '+۱۰۰', label: 'مشتری راضی' },
    { number: '+۱', label: 'سال تجربه' },
  ];

  const values = [
    {
      icon: Award,
      title: 'تعهد به برتری',
      description: 'همیشه در تلاش برای ارائه بهترین خدمات و محصولات هستیم',
      color: 'bg-[#75BFCA]',
    },
    {
      icon: Target,
      title: 'تمرکز بر کیفیت',
      description: 'ما به کیفیت بالا و جزئیات دقیق در تمام پروژه‌ها متعهد هستیم',
      color: 'bg-[#ADCC80]',
    },
    {
      icon: Heart,
      title: 'مشتری محوری',
      description: 'رضایت شما اولویت اول ماست و همیشه در کنار شما خواهیم بود',
      color: 'bg-[#ED775A]',
    },
  ];

  const team = [
    { name: 'امیر امرائی', role: 'فرانت', image: '1' },
    { name: 'امیر عباد تیمور پور', role: 'فرانت', image: '2' },
    { name: 'علی جباری', role: 'بک اند', image: '3' },
    { name: 'آریان دارپوی', role: 'بک اند', image: '4' },
    { name: 'فاطمه کردگاری', role: 'فرانت و دیزاین', image: '5' },
    { name: 'حسین مجیدی', role: 'فرانت و دیزاین', image: '6' },
    { name: 'ایلیا موسوی', role: 'فرانت و دیزاین', image: '7' },
  ];

  return (
    <div className="py-16 bg-white">
      {/* Hero */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#E4004B] text-white px-6 py-2 rounded-full mb-6">
            درباره ما
          </div>

          <h1 className="text-base font-bold mb-6 text-gray-900">
            ما رویاهای شما را به واقعیت تبدیل می‌کنیم
          </h1>

          <p className="text-sm text-gray-800 mb-8 leading-relaxed">
            از سال ۱۴۰۳ ما با ارائه راهکارهای خلاقانه، به توآورانه، به کسب‌وکارها کمک کرده‌ایم تا به اهداف خود دست یابند. 
            تیم ما متشکل از متخصصان با تجربه است که با اشتیاق و تعهد، بهترین خدمات را به شما ارائه می‌دهند.
          </p>
        </div>
      </div>

      {/* Stats - Updated with custom gradient styles matching the image */}
      <div className="bg-gradient-to-r from-[#ED775A] to-[#E4004B] py-8 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center h-40">
                <div className="text-xl font-bold text-white mb-1">{s.number}</div>
                <div className="text-white text-xs font-medium text-center">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#E4004B] text-white px-6 py-2 rounded-full mb-6">
            ارزش های ما
          </div>

          <h2 className="text-base font-bold mb-4 text-gray-900">
            اصولی که ما را هدایت می‌کنند
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_-2px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-2 p-6"
            >
              <div className="flex flex-row-reverse justify-between items-start gap-4">
                <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-right flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#E4004B] text-white px-6 py-2 rounded-full mb-6">
            تیم ما
          </div>

          <h2 className="text-base font-bold mb-4 text-gray-900">
            افرادی که پشت موفقیت‌های ما هستند
          </h2>
        </div>

        {/* Row 1 - 4 cards with 240px padding on sides */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-10" style={{ width: 'calc(100% - 480px)' }}>
            {team.slice(0, 4).map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_-2px_rgba(0,0,0,0.2)] transition-all duration-300"
                style={{ width: '330px', height: '400px', fontWeight: '500' }}
              >
                <div className="bg-gray-200 h-[250px] rounded-t-3xl flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-600" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-extrabold text-gray-900">{member.role}</h3>
                  <p className="text-xs text-gray-600">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - 3 cards with 425px padding on sides */}
        <div className="flex justify-center">
          <div className="flex gap-10" style={{ width: 'calc(100% - 850px)' }}>
            {team.slice(4).map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_-2px_rgba(0,0,0,0.2)] transition-all duration-300"
                style={{ width: '330px', height: '400px', fontWeight: '500' }}
              >
                <div className="bg-gray-200 h-[250px] rounded-t-3xl flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-600" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-extrabold text-gray-900">{member.role}</h3>
                  <p className="text-xs text-gray-600">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
