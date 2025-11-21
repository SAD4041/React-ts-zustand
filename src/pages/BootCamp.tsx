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
} from "lucide-react";
import Footer from "@/components/Custom/Footer.tsx";

function BootcampDetails() {
  const [selectedDay, setSelectedDay] = useState(0);

  const instructors = [
    {
      name: "دکتر محمد رضایی",
      role: "مدرس بخش الگوریتم‌ها",
      expertise: "الگوریتم‌های پیشرفته و تئوری گراف",
      image: "👨‍🏫",
    },
    {
      name: "مهندس علی احمدی",
      role: "مدرس بخش ساختمان‌های داده",
      expertise: "ساختمان‌های داده و بهینه‌سازی",
      image: "👨‍💼",
    },
    {
      name: "دکتر زهرا موسوی",
      role: "مدرس بخش رقابت عملی",
      expertise: "استراتژی رقابتی و حل مسائل",
      image: "👩‍🏫",
    },
    {
      name: "مهندس کمال یزدی",
      role: "دستیار آموزشی",
      expertise: "پشتیبانی فنی و راهنمایی",
      image: "👨‍💻",
    },
  ];

  const schedule = [
    {
      day: "روز اول",
      date: "15 اسفند 1404",
      time: "09:00 - 15:00",
      sessions: [
        {
          time: "09:00 - 10:30",
          title: "مرحب و معرفی (پرتو: دکتر رضایی)",
          type: "introduction",
        },
        {
          time: "10:45 - 12:15",
          title: "مبانی الگوریتم‌ها (پرتو: دکتر رضایی)",
          type: "lecture",
        },
        {
          time: "13:00 - 15:00",
          title: "تمرین عملی و حل مسائل",
          type: "practice",
        },
      ],
    },
    {
      day: "روز دوم",
      date: "16 اسفند 1404",
      time: "09:00 - 15:00",
      sessions: [
        {
          time: "09:00 - 10:30",
          title: "ساختمان‌های داده پایه (پرتو: مهندس احمدی)",
          type: "lecture",
        },
        {
          time: "10:45 - 12:15",
          title: "درخت‌ها و گراف (پرتو: مهندس احمدی)",
          type: "lecture",
        },
        {
          time: "13:00 - 15:00",
          title: "تمرین‌های عملی پیشرفته",
          type: "practice",
        },
      ],
    },
    {
      day: "روز سوم",
      date: "17 اسفند 1404",
      time: "09:00 - 15:00",
      sessions: [
        {
          time: "09:00 - 10:30",
          title: "برنامه‌ریزی پویا (پرتو: دکتر رضایی)",
          type: "lecture",
        },
        {
          time: "10:45 - 12:15",
          title: "الگوریتم‌های گراف (پرتو: دکتر رضایی)",
          type: "lecture",
        },
        {
          time: "13:00 - 15:00",
          title: "کارگاه عملی و مسائل چالشی",
          type: "workshop",
        },
      ],
    },
    {
      day: "روز چهارم",
      date: "18 اسفند 1404",
      time: "09:00 - 17:00",
      sessions: [
        {
          time: "09:00 - 10:30",
          title: "مرور و نکات حیاتی (پرتو: دکتر زهرا)",
          type: "review",
        },
        {
          time: "10:45 - 17:00",
          title: "مسابقه تیمی و ارزیابی نهایی",
          type: "competition",
        },
      ],
    },
  ];

  const benefits = [
    "آموزش جامع توسط متخصصین صنعت",
    "تجربه حل مسائل رقابتی واقعی",
    "شبکه‌سازی با برنامه‌نویسان نخبه",
    "گواهی‌نامه معتبر برای شرکت‌کنندگان",
    "دسترسی به منابع و فیلم‌های آموزشی",
    "پشتیبانی و راهنمایی فنی مداوم",
  ];

  const getSessionColor = (type) => {
    switch (type) {
      case "introduction":
        return "from-blue-500 to-cyan-500";
      case "lecture":
        return "from-purple-500 to-pink-500";
      case "practice":
        return "from-amber-500 to-orange-500";
      case "workshop":
        return "from-green-500 to-emerald-500";
      case "review":
        return "from-red-500 to-pink-500";
      case "competition":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getSessionLabel = (type) => {
    switch (type) {
      case "introduction":
        return "مقدمه";
      case "lecture":
        return "سخنرانی";
      case "practice":
        return "تمرین";
      case "workshop":
        return "کارگاه";
      case "review":
        return "مرور";
      case "competition":
        return "مسابقه";
      default:
        return "سایر";
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      {/* Header with Back Button */}
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
            <span className="text-white"> فشرده 4 روزه</span>
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-b from-[#003D6B]/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-[#FFD500]/20 rounded-full border border-[#FFD500]/50">
              <span className="text-[#FFD500] font-semibold">
                🚀 برنامه آموزشی فشرده
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              آماده‌سازی کامل برای ICPC 2025
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              یک برنامه آموزشی جامع و عملی برای تسلط بر مهارت‌های برنامه‌نویسی
              رقابتی
            </p>
            <div className="flex justify-center gap-8 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FFD500]" />
                <span>15-18 اسفند 1404</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#46BEF6]" />
                <span>24 ساعت آموزش</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D7263D]" />
                <span>محدود به 100 نفر</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">مدرسین برجسته</h3>
          <p className="text-gray-300">
            متخصصانی با تجربه گسترده در برنامه‌نویسی رقابتی
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-6xl mb-4">{instructor.image}</div>
              <h4 className="text-xl font-bold mb-2">{instructor.name}</h4>
              <p className="text-[#FFD500] text-sm font-semibold mb-2">
                {instructor.role}
              </p>
              <p className="text-gray-400 text-sm">{instructor.expertise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">جدول برنامه</h3>
            <p className="text-gray-300">برنامه تفصیلی هر روز آموزش</p>
          </div>

          {/* Day Selector */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {schedule.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedDay === index
                    ? "bg-[#FFD500] text-[#00274D] shadow-lg shadow-[#FFD500]/50"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Selected Day Details */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2">
                    {schedule[selectedDay].day}
                  </h4>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {schedule[selectedDay].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {schedule[selectedDay].time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {schedule[selectedDay].sessions.map((session, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div
                      className={`flex-shrink-0 px-4 py-2 bg-gradient-to-br ${getSessionColor(
                        session.type
                      )} rounded-lg text-sm font-semibold text-[#00274D]`}
                    >
                      {session.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        {session.title}
                      </p>
                      <p className="text-xs mt-1 inline-block px-2 py-1 rounded bg-white/10 text-gray-300">
                        {getSessionLabel(session.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">مزایای شرکت</h3>
          <p className="text-gray-300">آنچه از این بوت کمپ خواهید آموخت</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#FFD500] flex-shrink-0 mt-1" />
                <p className="text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Registration Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-3xl p-12">
              <div className="text-center mb-8">
                <Award className="w-16 h-16 text-[#FFD500] mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">ثبت‌نام در بوت کمپ</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">هزینه شرکت:</span>
                    <span className="text-3xl font-bold text-[#FFD500]">
                      رایگان
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    شامل تمام جلسات و منابع آموزشی
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-sm text-gray-300 mb-2">ظرفیت</div>
                    <div className="text-2xl font-bold text-[#46BEF6]">
                      100 نفر
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-sm text-gray-300 mb-2">
                      مهلت ثبت‌نام
                    </div>
                    <div className="text-2xl font-bold text-[#D7263D]">
                      30 بهمن
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => (window.location.href = "/bootcamp-signup")}
                  className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 inline-block ml-2" />
                  ثبت‌نام اکنون
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "mailto:info@icpc.com")
                  }
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-6 rounded-xl transition-all duration-300 border border-white/20"
                >
                  <Mail className="w-5 h-5 inline-block ml-2" />
                  تماس برای اطلاعات بیشتر
                </button>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400 text-center">
                  نیاز به حساب کاربری برای ثبت‌نام دارید؟
                  <a
                    href="/signup"
                    className="text-[#FFD500] hover:text-white transition-colors"
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

      {/* FAQ Preview Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">سوالات متداول</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "آیا نیاز به دانش قبلی دارد؟",
              a: "خیر، برنامه برای تمام سطوح طراحی شده است. اگر مبتدی هستید، مدرسین راهنمایی کافی ارائه خواهند داد.",
            },
            {
              q: "آیا این بوت کمپ برای مسابقه ICPC کافی است؟",
              a: "این بوت کمپ یک بنیاد قوی فراهم می‌کند. برای تسلط کامل، تمرین مداوم بعد از بوت کمپ ضروری است.",
            },
            {
              q: "آیا فیلم‌های جلسات نگهداری می‌شوند؟",
              a: "بله، تمام جلسات ضبط شده و شرکت‌کنندگان به مدت 3 ماه دسترسی خواهند داشت.",
            },
            {
              q: "چگونه می‌توانم تماس بگیرم؟",
              a: "می‌توانید از طریق ایمیل info@icpc.com یا فرم تماس در سایت با ما ارتباط برقرار کنید.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <h4 className="text-white font-bold mb-2">{item.q}</h4>
              <p className="text-gray-300">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-transparent to-[#003D6B]/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            اکنون تصمیم بگیرید و به مسیر موفقیت بپیوندید!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            ظرفیت محدود است - دیر نکنید
          </p>
          <button
            onClick={() => (window.location.href = "/bootcamp-signup")}
            className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
          >
            <Zap className="w-5 h-5 inline-block ml-2" />
            ثبت‌نام فوری
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default BootcampDetails;
