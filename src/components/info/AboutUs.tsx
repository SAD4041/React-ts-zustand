import { Target, Heart, Award, Users, TrendingUp } from 'lucide-react';

export default function App() {
  const stats = [
    { number: '+۵', label: 'فروشگاه و برند فعال' },
    { number: '+۱۰۰', label: 'فروش' },
    { number: '+۱۰۰', label: 'مشتری راضی' },
    { number: '+۱', label: 'سال تجربه' },
  ];

  // Reordered: تعهد به برتری (right), تمرکز بر کیفیت (center), مشتری محوری (left)
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
      color: 'bg-[#EE8783]',
    },
  ];

  // Team members with exact text as in the image
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
      {/* Hero Section - Updated to match the image design */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Button with turquoise background and white text */}
          <div className="inline-flex items-center gap-2 bg-[#4ABBEB] text-white px-6 py-2 rounded-full mb-6">
            <span>درباره ما</span>
          </div>
          
          {/* Main heading with black text and smaller size */}
          <h1 className="text-base font-bold mb-6 text-gray-900">
            ما رویاهای شما را به واقعیت تبدیل می‌کنیم
          </h1>
          
          {/* Paragraph text with smaller size and black color */}
          <p className="text-sm text-gray-800 mb-8 leading-relaxed">
            از سال ۱۴۰۳ ما با ارائه راهکارهای خلاقانه، به توآورانه، به کسب‌وکارها کمک کرده‌ایم تا به اهداف خود دست یابند. 
            تیم ما متشکل از متخصصان با تجربه است که با اشتیاق و تعهد، بهترین خدمات را به شما ارائه می‌دهند.
          </p>
        </div>
      </div>

      {/* Stats Section - Updated to match the image design */}
      <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-gray-100 py-8 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3">
                <div className="text-xl font-bold text-[#4ABBEB] mb-1">
                  {stat.number}
                </div>
                <div className="text-[#4ABBEB] text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          {/* Button with turquoise background and white text for "ارزش های ما" */}
          <div className="inline-flex items-center gap-2 bg-[#4ABBEB] text-white px-6 py-2 rounded-full mb-6">
            <span>ارزش های ما</span>
          </div>
          
          {/* Subheading with same styling as "ما رویاهای شما را ..." */}
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
              <div className="flex items-start gap-4">
                {/* Icon on the right with proper spacing from title */}
                <div className="flex flex-row-reverse items-start justify-between w-full">
                  <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right flex-grow pr-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Button with turquoise background and white text for "تیم ما" */}
          <div className="inline-flex items-center gap-2 bg-[#4ABBEB] text-white px-6 py-2 rounded-full mb-6">
            <span>تیم ما</span>
          </div>
          
          {/* Subheading with same styling as "ما رویاهای شما را ..." */}
          <h2 className="text-base font-bold mb-4 text-gray-900">
            افرادی که پشت موفقیت‌های ما هستند
          </h2>
        </div>
        
        {/* First row with 4 team members */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {team.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_-2px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col"
            >
              <div className="bg-gray-200 h-32 flex items-center justify-center rounded-t-3xl">
                <Users className="w-16 h-16 text-gray-600" />
              </div>
              <div className="p-4 text-center flex-grow pt-2 pb-3 rounded-b-3xl">
                <h3 className="text-sm font-extrabold mb-1 text-gray-900">{member.role}</h3>
                <p className="text-xs text-gray-600">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second row with 3 team members */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {team.slice(4, 7).map((member, index) => (
            <div
              key={index + 4}
              className="bg-white rounded-3xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_-2px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col"
            >
              <div className="bg-gray-200 h-32 flex items-center justify-center rounded-t-3xl">
                <Users className="w-16 h-16 text-gray-600" />
              </div>
              <div className="p-4 text-center flex-grow pt-2 pb-3 rounded-b-3xl">
                <h3 className="text-sm font-extrabold mb-1 text-gray-900">{member.role}</h3>
                <p className="text-xs text-gray-600">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
