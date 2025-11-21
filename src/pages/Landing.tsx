import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Trophy,
  Users,
  Code,
  ChevronDown,
  Clock,
  MapPin,
  Award,
  Zap,
  Target,
  Sparkles,
  Menu,
  X,
  Home,
  Info,
  Mail,
  BookOpen,
  Laptop,
} from "lucide-react";
import cesa from "../assets/CESA.svg";

function ICPCLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 15,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // تولید ذرات
    const newParticles = [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 3,
      color: ["#FFD500", "#46BEF6", "#D7263D", "#ffffff"][
        Math.floor(Math.random() * 4)
      ],
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 50 + 30,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegisterClick = () => {
    window.location.href = "/signup";
  };

  const handleCampClick = () => {
    window.location.href = "/camp";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    {
      label: "خانه",
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "درباره مسابقه",
      icon: Info,
      action: () => scrollToSection("about"),
    },
    {
      label: "بوت کمپ",
      icon: BookOpen,
      action: () => scrollToSection("bootcamp"),
    },
    {
      label: "جدول زمانی",
      icon: Calendar,
      action: () => scrollToSection("timeline"),
    },
    {
      label: "تماس با ما",
      icon: Mail,
      action: () => scrollToSection("contact"),
    },
  ];

  const stats = [
    {
      icon: Award,
      number: "10+",
      label: "دانشگاه شرکت‌کننده",
      color: "#D7263D",
    },
    {
      icon: Users,
      number: "1000+",
      label: "شرکت‌کننده",
      color: "#46BEF6",
    },
    // {
    //   icon: MapPin,
    //   number: "110+",
    //   label: "کشور شرکت‌کننده",
    //   color: "#D7263D",
    // },
    {
      icon: Trophy,
      number: "4",
      label: "سال برگزاری",
      color: "#FFD500",
    },
  ];

  const features = [
    {
      icon: Code,
      title: "چهار دوره تجربه موفق",
      description:
        "ElmocPC با پشتوانه چهار دوره برگزاری آنلاین و استقبال گسترده شرکت‌کنندگان ادامه می‌یابد.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "نسخه حضوری",
      description:
        "امسال رویداد با تمرکز بر تعامل، همکاری و تجربه واقعی رقابت به‌صورت حضوری برگزار می‌شود.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "شبیه‌سازی آزمون کشوری",
      description:
        "رقابتی طراحی‌شده بر اساس استانداردها و شرایط مسابقات کشوری برای آمادگی کامل تیم‌ها.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      title: "جوایز و افتخارات",
      description: "مدال‌ها، گواهینامه‌ها و جوایز ارزشمند برای تیم‌های برتر.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const bootcampModules = [
    {
      day: "روز اول",
      title: "مبانی الگوریتم‌ها",
      topics: ["مرتب‌سازی", "جستجو", "تحلیل پیچیدگی"],
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      day: "روز دوم",
      title: "ساختمان‌های داده",
      topics: ["آرایه‌ها", "لیست‌های پیوندی", "صف و پشته"],
      icon: Laptop,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      day: "روز سوم",
      title: "الگوریتم‌های پیشرفته",
      topics: ["پویا سازی", "گراف", "درخت‌ها"],
      icon: BookOpen,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      day: "روز چهارم",
      title: "مسابقه عملی",
      topics: ["حل مسائل", "تیم‌ورک", "تقابل نهایی"],
      icon: Trophy,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const timeline = [
    { date: "1 تا 5 آذر 1404", title: "ثبت نام بوت کمپ", status: "active" },
    { date: "6 تا 14 آذر 1404", title: "برگزاری بوت کمپ", status: "upcoming" },
    { date: "4 آذر 1404", title: "شروع ثبت‌نام", status: "upcoming" },
    { date: "15 آذر 1404", title: "پایان ثبت‌نام", status: "upcoming" },
    { date: "21 آذر 1404", title: "روز مسابقه", status: "upcoming" },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white overflow-x-hidden"
      dir="rtl"
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      scrollY > 50
        ? "bg-[#00274D]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl"
        : "bg-[#00274D]/90 md:bg-transparent"
    }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div>
                <div className="text-xl font-bold">
                  <span className="text-[#ffffff]">ELMO</span>
                  <span className="text-[#46BEF6]">C</span>
                  <span className="text-[#D7263D]">P</span>
                  <span className="text-[#FFD500]">C</span>
                  <span className="text-white"> 2025</span>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={handleLoginClick}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                ورود
              </Button>
              <Button
                onClick={handleRegisterClick}
                className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#FFD500]/50"
              >
                ثبت‌نام
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-slide-down">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200"
                >
                  ورود
                </Button>
                <Button
                  onClick={handleRegisterClick}
                  className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  ثبت‌نام
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00274D]/90 via-[#003D6B]/80 to-[#00274D]/90" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 213, 0, 0.1) 0%, transparent 50%)`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Enhanced Floating Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo Section */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-block p-4">
              <img src={cesa} alt="" />
            </div>
          </div>

          <div className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-[#ffffff]">ELMO</span>
            <span className="text-[#46BEF6]">C</span>
            <span className="text-[#D7263D]">P</span>
            <span className="text-[#FFD500]">C</span>
            <span className="text-white"> 2025</span>
          </div>

          <p
            className="text-xl md:text-2xl mb-4 text-gray-200 animate-slide-up"
            dir="rtl"
            lang="fa"
            style={{ animationDelay: "0.2s" }}
          >
            پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت
          </p>

          {/* Countdown Timer */}
          <div
            className="mb-12 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-[#FFD500] mb-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              زمان باقی‌مانده تا پایان ثبت‌نام
            </p>
            <div className="flex justify-center gap-4 flex-wrap" dir="ltr">
              {[
                { value: countdown.days, label: "روز" },
                { value: countdown.hours, label: "ساعت" },
                { value: countdown.minutes, label: "دقیقه" },
                { value: countdown.seconds, label: "ثانیه" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[80px]"
                >
                  <div className="text-3xl font-bold text-[#FFD500]">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              onClick={handleRegisterClick}
              className="group relative bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 inline-block ml-2 group-hover:rotate-12 transition-transform" />
              ثبت‌نام در مسابقه
            </Button>
            <Button
              onClick={handleCampClick}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-6 px-12 rounded-xl text-lg transition-all duration-300 hover:scale-105"
            >
              اطلاعات بوت کمپ
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            {/* <ChevronDown className="w-8 h-8 text-[#FFD500]" /> */}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <stat.icon
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: stat.color }}
                />
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="about" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-white bg-clip-text text-transparent">
            درباره ELMOCPC
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ElmocPC یک رقابت علمی–فنی پویا و دانشجویی است که طی چهار دوره گذشته
            به‌صورت آنلاین برگزار شده و توانسته تجربه‌ای موفق، منظم و پرمخاطب
            ایجاد کند. امسال، پس از چندین دوره تجربه ارزشمند در برگزاری آنلاین،
            این رویداد برای نخستین‌بار به شکل حضوری برگزار خواهد شد. هدف ElmocPC
            فراهم‌کردن فضایی حرفه‌ای برای یادگیری، چالش، همکاری و سنجش
            توانمندی‌های شرکت‌کنندگان است؛ فضایی که هر سال با استقبال بیشتری
            همراه شده و اکنون با برگزاری حضوری، قدمی بزرگ‌تر به سوی تعاملی‌تر و
            هیجان‌انگیزتر شدن برمی‌دارد.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />
              <feature.icon
                className={`w-12 h-12 mb-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
              />
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bootcamp Section */}
      <div id="bootcamp" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#FFD500]/20 rounded-full border border-[#FFD500]/50">
              <span className="text-[#FFD500] font-semibold">🚀 جدید</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              بوت کمپ فشرده 4 روزه
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              آماده‌سازی شدید برای مسابقه با برنامه آموزشی فشرده و عملی
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            dir="rtl"
          >
            {bootcampModules.map((module, index) => (
              <a
                key={index}
                href="/bootcamp-details"
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <module.icon
                      className={`w-10 h-10 bg-gradient-to-br ${module.gradient} bg-clip-text text-transparent`}
                    />
                    <span className="text-sm font-bold text-[#FFD500] bg-[#FFD500]/20 px-3 py-1 rounded-full">
                      {module.day}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {module.title}
                  </h3>
                  <ul className="space-y-2">
                    {module.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-[#FFD500] rounded-full" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#46BEF6]/20 to-[#D7263D]/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-[#46BEF6] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">مدت زمان</h4>
                <p className="text-gray-300">4 روز 12 ساعت آموزش</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-[#FFD500] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  آموزش عملی
                </h4>
                <p className="text-gray-300">مدرسین باتجربه و مسائل واقعی</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-[#D7263D] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  گواهی‌نامه
                </h4>
                <p className="text-gray-300">
                  صدور گواهی‌نامه برای شرکت‌کنندگان
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={() => (window.location.href = "/bootcamp-details")}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 border border-white/20"
              >
                مشاهده جزئیات کامل
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div id="timeline" className="py-20 container mx-auto px-4" dir="rtl">
        <div className="text-center mb-16">
          <div className="text-4xl md:text-5xl font-bold mb-4 bg-[#46BEF6] bg-clip-text text-transparent">
            جدول زمانی مسابقه
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center mb-8 last:mb-0"
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  item.status === "active"
                    ? "bg-[#FFD500] animate-pulse"
                    : "bg-white/30"
                } z-10`}
              />
              {index !== timeline.length - 1 && (
                <div className="absolute left-2 top-4 w-0.5 h-16 bg-white/20" />
              )}
              <div className="flex-1 mr-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.date}</p>
                  </div>
                  {item.status === "active" && (
                    <span className="bg-[#FFD500] text-[#00274D] px-4 py-1 rounded-full text-sm font-semibold">
                      فعال
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-3xl p-12 text-center">
            <Target className="w-16 h-16 mx-auto mb-6 text-[#FFD500]" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              آماده‌اید برای چالش؟
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              به جمع شرکت‌کنندگان ElmocPC بپیوندید و مهارت‌های الگوریتمی خود را
              در شرایط شبیه‌سازی‌شده‌ی آزمون کشوری محک بزنید.
            </p>
            <Button
              onClick={handleRegisterClick}
              className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 inline-block ml-2" />
              همین الان ثبت‌نام کنید
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        id="contact"
        className="py-8 border-t border-white/10 bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Right side logos */}
            <div className="flex items-center gap-4 order-2 md:order-1 mt-6 md:mt-0">
              <img
                src="/logos/logo1.png"
                alt="Logo 1"
                className="h-10 opacity-80 hover:opacity-100 transition"
              />
              <img
                src="/logos/logo2.png"
                alt="Logo 2"
                className="h-10 opacity-80 hover:opacity-100 transition"
              />
              <img
                src="/logos/logo3.png"
                alt="Logo 3"
                className="h-10 opacity-80 hover:opacity-100 transition"
              />
            </div>

            {/* Contact section */}
            <div className="text-center md:text-left ml-10 mr-10 order-1 md:order-2">
              <h3 className="text-xl font-bold text-white mb-2">تماس با ما</h3>
              <p className="text-gray-400 mb-4">
                برای اطلاعات بیشتر با ما در ارتباط باشید
              </p>

              <div className="flex justify-end gap-6 text-gray-400 mb-4">
                <a
                  href="mailto:info@icpc.com"
                  className="hover:text-[#FFD500] transition-colors duration-200"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright – centered bottom */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-1">
              © 2025 ELMOCPC - تمامی حقوق محفوظ است
            </p>
            <p className="text-sm text-gray-500">
              Computer Engineering Scientific Associate
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-float {
          animation: float linear forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ICPCLanding;
