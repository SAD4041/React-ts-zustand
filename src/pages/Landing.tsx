import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Code, ChevronDown, Clock, MapPin, Award, Zap, Target, Sparkles, Menu, X, Home, Info, Mail } from "lucide-react";

function ICPCLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [countdown, setCountdown] = useState({ days: 45, hours: 12, minutes: 30, seconds: 15 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegisterClick = () => {
    window.location.href = "/signup";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "خانه", icon: Home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: "درباره مسابقه", icon: Info, action: () => scrollToSection('about') },
    { label: "جدول زمانی", icon: Calendar, action: () => scrollToSection('timeline') },
    { label: "تماس با ما", icon: Mail, action: () => scrollToSection('contact') },
  ];

  const stats = [
    { icon: Users, number: "70000+", label: "شرکت‌کننده جهانی" },
    { icon: MapPin, number: "110+", label: "کشور شرکت‌کننده" },
    { icon: Trophy, number: "50+", label: "سال برگزاری" },
    { icon: Award, number: "1000+", label: "دانشگاه شرکت‌کننده" },
  ];

  const features = [
    {
      icon: Code,
      title: "چالش‌های الگوریتمی",
      description: "حل مسائل پیچیده برنامه‌نویسی در زمان محدود",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "کار تیمی",
      description: "همکاری سه نفره برای رسیدن به هدف مشترک",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Trophy,
      title: "جوایز ارزشمند",
      description: "مدال‌ها، گواهینامه‌ها و فرصت‌های شغلی",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "رقابت زنده",
      description: "تجربه هیجان‌انگیز رقابت در لحظه",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  const timeline = [
    { date: "15 دی 1404", title: "شروع ثبت‌نام", status: "active" },
    { date: "30 بهمن 1404", title: "پایان ثبت‌نام", status: "upcoming" },
    { date: "15 اسفند 1404", title: "مرحله مقدماتی", status: "upcoming" },
    { date: "20 فروردین 1405", title: "مرحله نهایی", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#00274D]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-2 bg-[#FFD500]/20 rounded-lg border border-[#FFD500]/30">
                <Code className="w-6 h-6 text-[#FFD500]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ICPC 2025</h3>
                <p className="text-xs text-gray-400">Programming Contest</p>
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
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFD500]/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo Section */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <Code className="w-16 h-16 text-[#FFD500] animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-[#FFD500] via-[#FFF] to-[#FFD500] bg-clip-text text-transparent">
              ICPC 2025
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-gray-200 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            مسابقات برنامه‌نویسی دانشجویی جهانی
          </p>

          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            International Collegiate Programming Contest
          </p>

          {/* Countdown Timer */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <p className="text-sm text-[#FFD500] mb-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              زمان باقی‌مانده تا پایان ثبت‌نام
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
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
                  <div className="text-3xl font-bold text-[#FFD500]">{item.value}</div>
                  <div className="text-xs text-gray-300 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <Button
              onClick={handleRegisterClick}
              className="group relative bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 inline-block ml-2 group-hover:rotate-12 transition-transform" />
              ثبت‌نام در مسابقه
            </Button>
            <Button
              onClick={handleLoginClick}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-6 px-12 rounded-xl text-lg transition-all duration-300 hover:scale-105"
            >
              ورود به حساب کاربری
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#FFD500]" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#FFD500]" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="about" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD500] to-white bg-clip-text text-transparent">
            چرا ICPC؟
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            بزرگ‌ترین و معتبرترین مسابقه برنامه‌نویسی دانشجویی جهان
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              <feature.icon className={`w-12 h-12 mb-4 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div id="timeline" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD500] to-white bg-clip-text text-transparent">
              جدول زمانی مسابقه
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center mb-8 last:mb-0">
                <div className={`w-4 h-4 rounded-full ${item.status === 'active' ? 'bg-[#FFD500] animate-pulse' : 'bg-white/30'} z-10`} />
                {index !== timeline.length - 1 && (
                  <div className="absolute left-2 top-4 w-0.5 h-16 bg-white/20" />
                )}
                <div className="flex-1 mr-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.date}</p>
                    </div>
                    {item.status === 'active' && (
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
      </div>

      {/* CTA Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-3xl p-12 text-center">
          <Target className="w-16 h-16 mx-auto mb-6 text-[#FFD500]" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            آماده‌اید برای چالش؟
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            به جمع هزاران برنامه‌نویس نخبه در سراسر جهان بپیوندید و مهارت‌های خود را به چالش بکشید
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

      {/* Footer */}
      <footer id="contact" className="py-8 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">تماس با ما</h3>
            <p className="text-gray-400 mb-4">برای اطلاعات بیشتر با ما در ارتباط باشید</p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a href="mailto:info@icpc.com" className="hover:text-[#FFD500] transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <p className="text-gray-400 mb-2">
            © 2025 ICPC - تمامی حقوق محفوظ است
          </p>
          <p className="text-sm text-gray-500">
            International Collegiate Programming Contest
          </p>
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

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
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

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ICPCLanding;