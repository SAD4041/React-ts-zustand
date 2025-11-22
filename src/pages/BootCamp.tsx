import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Zap,
  ChevronDown,
} from "lucide-react";
import Footer from "@/components/Custom/Footer.tsx";

function BootcampDetails() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const instructors = [
    {
      name: "امین انوری",
      role: "مدرس رفع اشکال",
      expertise: "الگوریتم‌های پیشرفته و تئوری",
      image: "👨‍🏫",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const schedule = [
    {
      day: "روز اول",
      date: "6 آذر 1404",
      morning: "09:00 - 14:00",
      afternoon: "16:00 - 19:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی ",
      afternoonTitle: "رفع اشکال با امین انوری",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال و بحث",
    },
    {
      day: "روز دوم",
      date: "7 آذر 1404",
      morning: "09:00 - 14:00",
      afternoon: "16:00 - 19:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی",
      afternoonTitle: "رفع اشکال با امین انوری",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال و بحث",
    },
    {
      day: "روز سوم",
      date: "13 آذر 1404",
      morning: "09:00 - 14:00",
      afternoon: "16:00 - 19:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی",
      afternoonTitle: "رفع اشکال - مدرس اعلام می‌شود",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال",
    },
    {
      day: "روز چهارم",
      date: "14 آذر 1404",
      morning: "09:00 - 14:00",
      afternoon: "16:00 - 19:00",
      theme: "کانتست و رفع اشکال",
      morningTitle: "کانتست آزمایشی ",
      afternoonTitle: "رفع اشکال - مدرس اعلام می‌شود",
      description: "صبح: کانتست حل مسائل | بعد از ظهر: رفع اشکال",
    },
  ];

  const benefits = [
    "آموزش جامع توسط متخصصین نامدار",
    "تجربه حل مسائل رقابتی واقعی",
    "شبکه‌سازی با برنامه‌نویسان نخبه",
    " سوالات گلچین شده از بهترین کانست ها",
    "دسترسی به منابع و فیلم‌های آموزشی",
    "پشتیبانی و راهنمایی فنی مداوم",
  ];

  const faqs = [
    {
      q: "آیا نیاز به دانش قبلی دارد؟",
      a: "بله، این بوتکمپ فشرده پیشرفته است و نیاز به دانش کافی از الگوریتم دارد",
    },
    {
      q: "این کمپ به صورت آنلاین برگزار می شه یا حضوری؟",
      a: "هم کانتست و هم رفع اشکال هر 2 به صورت آنلاین برگزار می شوند",
    },
    {
      q: "آیا این بوت کمپ برای مسابقه ELMOCPC کافی است؟",
      a: "این بوت کمپ یک بنیاد قوی فراهم می‌کند. برای تسلط کامل، تمرین مداوم بعد از بوت کمپ ضروری است.",
    },
    {
      q: "آیا شرکت برای افراد خارج از دانشگاه علم و صنعت ممکنه؟",
      a: "بله، شرکت برای عموم افراد حتی دانش آموزان آزاد هست",
    },
    {
      q: "آیا فیلم‌های جلسات نگهداری می‌شوند؟",
      a: "بله، تمام جلسات ضبط شده و شرکت‌کنندگان به مدت 3 ماه دسترسی خواهند داشت.",
    },
    {
      q: "چگونه می‌توانم تماس بگیرم؟",
      a: "می توانید از طرق آیدی 'cesa_public' در تلگرام با ما در ارتباط باشید",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      <div className="sticky top-0 z-40 bg-[#00274D]/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            بازگشت
          </a>
          <h1 className="text-2xl font-bold">
            <span className="text-[#FFD500]">بوت کمپ</span>
            <span className="text-white"> 4 روزه</span>
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-[#003D6B]/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-[#FFD500]/20 rounded-full border border-[#FFD500]/50">
              <span className="text-[#FFD500] font-semibold">
                🚀 برنامه آموزشی فشرده
              </span>
            </div>
            <div className="text-6xl md:text-6xl mt-2 font-bold mb-8 bg-gradient-to-r from-white via-[#FFD500] to-white bg-clip-text text-transparent">
              آماده‌سازی پیشرفته برای ICPC 2025
            </div>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              یک برنامه آموزشی جامع و عملی برای تسلط بر مهارت‌های برنامه‌نویسی
              رقابتی
            </p>
            <div className="flex justify-center gap-8 flex-wrap text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <Calendar className="w-5 h-5 text-[#FFD500]" />
                <span>7-14 آذر 1404</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <Clock className="w-5 h-5 text-[#46BEF6]" />
                <span>کانتست روزانه</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <Users className="w-5 h-5 text-[#D7263D]" />
                <span>محدود به 20 تیم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 container mx-auto px-4">
        <div className="text-center mb-20">
          <h3 className="text-5xl font-bold mb-6">مدرسین برجسته</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FFD500] to-[#46BEF6] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${instructor.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              ></div>
              <div className="relative z-10">
                <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {instructor.image}
                </div>
                <h4 className="text-xl font-bold mb-2">{instructor.name}</h4>
                <p
                  className={`text-sm font-semibold mb-3 bg-gradient-to-r ${instructor.color} bg-clip-text text-transparent`}
                >
                  {instructor.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {instructor.expertise}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-6">جدول برنامه آموزشی</h3>
            <div className="h-1 w-24 bg-gradient-to-r from-[#FFD500] to-[#46BEF6] mx-auto"></div>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {schedule.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedDay === index
                    ? "bg-[#FFD500] text-[#00274D] shadow-2xl shadow-[#FFD500]/50 scale-105"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 mb-8">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 bg-[#FFD500] rounded-full"></div>
                  <h4 className="text-3xl font-bold">
                    {schedule[selectedDay].day}
                  </h4>
                </div>
                <div className="flex items-center gap-6 text-gray-300 ml-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#FFD500]" />
                    <span className="font-semibold">
                      {schedule[selectedDay].date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* صبح - کانتست */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#46BEF6]" />
                    <span className="font-bold text-lg">
                      {schedule[selectedDay].morning}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-white font-semibold">
                      🎯 {schedule[selectedDay].morningTitle}
                    </p>
                  </div>
                </div>

                {/* بعد از ظهر - رفع اشکال */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FFD500]" />
                    <span className="font-bold text-lg">
                      {schedule[selectedDay].afternoon}
                    </span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-white font-semibold">
                      💡 {schedule[selectedDay].afternoonTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 container mx-auto px-4">
        <div className="text-center mb-20">
          <h3 className="text-5xl font-bold mb-6">مزایای شرکت</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FFD500] to-[#46BEF6] mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <CheckCircle className="w-6 h-6 text-[#FFD500] flex-shrink-0 mt-1" />
              <p className="text-gray-300 text-lg font-semibold">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#FFD500]/20 via-[#46BEF6]/10 to-[#D7263D]/10 backdrop-blur-md border border-[#FFD500]/30 rounded-3xl p-12">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-[#FFD500]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-[#FFD500]" />
                </div>
                <h3 className="text-4xl font-bold mb-2">شروع یادگیری</h3>
                <p className="text-gray-300">ثبت‌نام محدود</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center transform hover:scale-110 transition-transform">
                    <div className="text-3xl font-bold text-[#FFD500] mb-2">
                      200
                    </div>
                    <p className="text-sm text-gray-300">
                      {" "}
                      هزار تومن تمام جلسات و منابع{" "}
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center transform hover:scale-110 transition-transform">
                    <div className="text-3xl font-bold text-[#46BEF6] mb-2">
                      20 تیم
                    </div>
                    <p className="text-sm text-gray-300">ظرفیت شرکت‌کنندگان</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center transform hover:scale-110 transition-transform">
                    <div className="text-3xl font-bold text-[#D7263D] mb-2">
                      5 آذر
                    </div>
                    <p className="text-sm text-gray-300">پایان مهلت ثبت‌نام</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => (window.location.href = "/bootcamp-signup")}
                  className="w-full bg-gradient-to-r from-[#FFD500] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD500] text-[#00274D] font-bold py-6 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/60 hover:scale-105 transform"
                >
                  <Sparkles className="w-5 h-5 inline-block ml-2" />
                  ثبت‌نام اکنون
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "mailto:info@icpc.com")
                  }
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 inline-block ml-2" />
                  تماس برای اطلاعات بیشتر
                </button>
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  نیاز به حساب کاربری دارید؟
                  <a
                    href="/signup"
                    className="text-[#FFD500] hover:text-white transition-colors font-semibold"
                  >
                    {" "}
                    اینجا ثبت‌نام کنید
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 container mx-auto px-4">
        <div className="text-center mb-20">
          <h3 className="text-5xl font-bold mb-6">سوالات متداول</h3>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FFD500] to-[#46BEF6] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h4 className="text-white font-bold text-lg text-right flex-1">
                  {item.q}
                </h4>
                <ChevronDown
                  className={`w-6 h-6 text-[#FFD500] transition-transform duration-300 flex-shrink-0 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6 bg-white/5 border-t border-white/10">
                  <p className="text-gray-300 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-transparent to-[#003D6B]/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl text-gray-300 mb-12">
            ظرفیت محدود است - دیر نکنید
          </p>
          <button
            onClick={() => (window.location.href = "/bootcamp-signup")}
            className="bg-gradient-to-r from-[#FFD500] to-[#e6c200] hover:from-[#e6c200] hover:to-[#FFD500] text-[#00274D] font-bold py-6 px-16 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/60 hover:scale-110 transform inline-flex items-center gap-3"
          >
            <Zap className="w-6 h-6" />
            ثبت‌نام فوری
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BootcampDetails;
