import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Trophy,
  Users,
  Code,
  Clock,
  Award,
  Zap,
  Menu,
  X,
  Home,
  Info,
  Mail,
  Flag,
  User,
  LogOut,
  Sparkles,
  Shield,
  Medal,
  Laptop,
  AlertTriangle,
  Smartphone,
  ClipboardCheck,
  Folder,
} from "lucide-react";
import cesa from "../assets/CESA.svg";
import Footer from "@/components/Custom/Footer.tsx";
import useUserStore from "@/store/userStore/userStore";

function ICPCLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-12T08:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  // const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  // const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { authUser, clearAuth } = useUserStore();
  const isLoggedIn = !!authUser;
  const displayName =
    authUser?.first_name || authUser?.email?.split("@")[0] || "کاربر";

  useEffect(() => {
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

  const handleRegisterClick = () => {
    window.location.href = "/signup";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleDashboardClick = () => {
    window.location.href = "/dashboard";
  };

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userData");
    // setUserDropdownOpen(false);
  };

  // const handleSignUpClick = () => {
  //   window.location.href =
  //     "https://evand.com/events/%DA%A9%D9%85%D9%BE-%D8%A2%D9%85%D8%A7%D8%AF%DA%AF%DB%8C-elmocpc-42621082";
  // };

  const scrollToSection = (id: string) => {
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
      label: "جدول زمانی",
      icon: Calendar,
      action: () => scrollToSection("timeline"),
    },
    {
      label: "قوانین و جوایز",
      icon: Trophy,
      action: () => scrollToSection("rules"),
    },
    // {
    //   label: "شرکت‌کنندگان قبلی",
    //   icon: Star,
    //   action: () => scrollToSection("testimonials"),
    // },
    {
      label: "تماس با ما",
      icon: Mail,
      action: () => scrollToSection("contact"),
    },
  ];

  const stats = [
    {
      icon: Award,
      number: "15+",
      label: "دانشگاه شرکت‌کننده",
      color: "#D7263D",
    },
    {
      icon: Users,
      number: "1200+",
      label: "شرکت‌کننده",
      color: "#46BEF6",
    },
    {
      icon: Trophy,
      number: "5",
      label: "سال تجربه موفق",
      color: "#FFD500",
    },
    {
      icon: Flag,
      number: "200+",
      label: "تیم ثبت‌نام‌شده",
      color: "#3DDC84",
    },
  ];

  const features = [
    {
      icon: Code,
      title: "مسابقه حضوری ویژه",
      description:
        "اولین دوره حضوری ELMOCPC با امکانات و فضای رقابتی حرفه‌ای در دانشگاه علم و صنعت",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "رقابت تیمی",
      description:
        "شرکت در قالب تیم‌های ۳ نفره و تجربه کار گروهی واقعی در محیط دانشگاه",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "شبیه‌سازی آزمون کشوری",
      description:
        "آماده‌سازی برای مسابقات ملی با استانداردهای بین‌المللی ICPC",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      title: "جوایز ارزشمند",
      description: "30 میلیون تومان جایزه نقدی و هدایای ویژه برای تیم‌های برتر",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const timeline = [
    {
      date: "1 تا 5 آذر 1404",
      title: "ثبت نام بوت کمپ",
      status: "completed", // ✅ تغییر به completed
    },
    {
      date: "۷ آذر ۱۴۰۴",
      title: "شروع ثبت‌نام مسابقه",
      status: "active", // 🟡 فعال
    },
    {
      date: "۱۵ آذر ۱۴۰۴",
      title: "پایان مهلت ثبت‌نام",
      status: "upcoming", // 🔵 آینده
    },
    {
      date: "۱۸ آذر ۱۴۰۴",
      title: "اعلام لیست نهایی تیم‌ها",
      status: "upcoming",
    },
    {
      date: "۲۱ آذر ۱۴۰۴",
      title: "روز برگزاری مسابقه",
      status: "upcoming",
    },
    {
      date: "۲۱ آذر ۱۴۰۴",
      title: "مراسم اختتامیه و اهدای جوایز",
      status: "upcoming",
    },
  ];
  // اضافه کردن این تابع قبل از return
  const getLineStatus = (currentItemStatus: string, nextItemStatus: string) => {
    if (currentItemStatus === "completed" && nextItemStatus === "completed") {
      return "completed";
    }
    if (currentItemStatus === "completed" && nextItemStatus === "active") {
      return "completed-to-active";
    }
    if (currentItemStatus === "active" && nextItemStatus === "upcoming") {
      return "active-to-upcoming";
    }
    if (currentItemStatus === "completed" && nextItemStatus === "upcoming") {
      return "completed-to-upcoming";
    }
    return "upcoming";
  };

  const prizes = [
    {
      rank: "🥇 مقام اول",
      medal: Medal,
      reward: " ۱۵,۰۰۰,۰۰۰ تومان",
      color: "from-yellow-500 to-amber-500",
    },
    {
      rank: "🥈 مقام دوم",
      medal: Medal,
      reward: " ۱۰,۰۰۰,۰۰۰ تومان",
      color: "from-gray-400 to-gray-300",
    },
    {
      rank: "🥉 مقام سوم",
      medal: Medal,
      reward: "  ۵,۰۰۰,۰۰۰ تومان",
      color: "from-orange-700 to-orange-600",
    },
    {
      rank: "🏆 تیم‌های برتر",
      medal: Trophy,
      reward: "گواهینامه معتبر + هدایای ویژه",
      color: "from-blue-500 to-cyan-500",
    },
  ];
  const rules = [
    {
      title: "شرایط شرکت",
      description:
        "هر تیم می‌تواند از ۱ تا ۳ نفر تشکیل شود و حضور دانش‌آموزان و دانشجویان در تمامی مقاطع مجاز است",
      icon: Users,
      color: "#46BEF6",
    },
    {
      title: "مدت زمان مسابقه",
      description:
        "مسابقه برای مدت ۵ ساعت متوالی برگزار می‌شود. زمان‌بندی دقیق متعاقبا اعلام می‌شود",
      icon: Clock,
      color: "#FFD500",
    },
    {
      title: "زبان‌ها و محیط توسعه",
      description:
        "زبان‌های C++، Python، Java و JavaScript مورد پذیرش هستند و انتخاب محیط توسعه آزاد است. نسخه‌های استاندارد Python، GCC، Java و Node.js الزامی است",
      icon: Code,
      color: "#3DDC84",
    },
    {
      title: "قوانین فنی و منابع",
      description:
        "استفاده از اینترنت به‌صورت کامل ممنوع است. تنها منابع مجاز، مستندات آفلاین و حداکثر ۲۰ صفحه منابع چاپ‌شده یا دست‌نویس برای کمک قابل استفاده است",
      icon: Shield,
      color: "#D7263D",
    },
    {
      title: "تجهیزات مجاز و سخت‌افزار",
      description:
        "هر تیم تنها مجاز به همراه داشتن یک لپ‌تاپ است. استفاده از چند مانیتور، تبلت یا سخت‌افزار اضافی ممنوع است. نصب نرم‌افزار جدید فقط با اجازه مسئول فنی مجاز است",
      icon: Laptop,
      color: "#8A2BE2",
    },
    {
      title: "ممنوعیت وسایل الکترونیکی",
      description:
        "در هنگام ورود، تلفن‌های همراه از شرکت‌کنندگان دریافت می‌شود. استفاده از هرگونه وسیله ارتباطی یا ابزارهای تولید خودکار کد مانند AI، Copilot و ... ممنوع است",
      icon: Smartphone,
      color: "#FF7F50",
    },
    {
      title: "تخلفات و رفتار حرفه‌ای",
      description:
        "هرگونه تبادل کد یا اطلاعات میان تیم‌ها و رفتار نامناسب باعث حذف تیم خواهد شد. در صورت انجام هرگونه عمل مغایر قوانین، تیم متخلف بدون هیچ استثنایی از ادامه مسابقه حذف خواهد شد",
      icon: AlertTriangle,
      color: "#FF4C4C",
    },
    {
      title: "سیستم داوری و امتیازدهی",
      description:
        "تمام ارسال‌ها توسط داور خودکار بررسی می‌شود و نتیجه داوری نهایی و غیرقابل‌تغییر است. امتیاز هر سؤال متفاوت است و زمان و تعداد ارسال‌ها روی امتیاز نهایی تأثیر دارد. رده‌بندی لحظه‌ای نمایش داده می‌شود",
      icon: ClipboardCheck,
      color: "#00BFFF",
    },
    {
      title: "خروج موقت",
      description:
        "خروج از سالن مسابقه فقط با اجازه داور ممکن است و زمان خروج به تیم اضافه نمی‌شود",
      icon: LogOut,
      color: "#FF6347",
    },
    {
      title: "تحویل نهایی و پلتفرم",
      description:
        "تیم باید تمام کدها را در پوشه مشخص‌شده ذخیره کرده و طبق دستورالعمل، در پلتفرم اعلامی آپلود کند",
      icon: Folder,
      color: "#32CD32",
    },
  ];

  // const testimonials = [
  //   {
  //     name: "علی محمدی",
  //     university: "دانشگاه علم و صنعت",
  //     year: "شرکت‌کننده دوره چهارم",
  //     comment:
  //       "تجربه فوق‌العاده‌ای بود! مسابقات ELMOCPC بهترین فرصت برای آمادگی در مسابقات کشوری است.",
  //     avatar: "👨‍💻",
  //   },
  //   {
  //     name: "سارا احمدی",
  //     university: "دانشگاه تهران",
  //     year: "قهرمان دوره سوم",
  //     comment:
  //       "با شرکت در ELMOCPC توانستم برای مسابقات ملی کاملاً آماده شوم. فضای رقابتی بسیار حرفه‌ای بود.",
  //     avatar: "👩‍💻",
  //   },
  //   {
  //     name: "محمد جعفری",
  //     university: "شریف",
  //     year: "نایب قهرمان دوره چهارم",
  //     comment:
  //       "کیفیت سوالات و سطح مسابقه واقعاً قابل تحسین است. به همه دانشجویان کامپیوتر توصیه می‌کنم.",
  //     avatar: "🧑‍💻",
  //   },
  // ];

  // const nextTestimonial = () => {
  //   setActiveTestimonial((prev) =>
  //     prev === testimonials.length - 1 ? 0 : prev + 1
  //   );
  // };

  // const prevTestimonial = () => {
  //   setActiveTestimonial((prev) =>
  //     prev === 0 ? testimonials.length - 1 : prev - 1
  //   );
  // };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white overflow-x-hidden"
      dir="rtl"
    >
      {/* Navbar - بدون تغییر */}
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

            {/* CTA Buttons or User Profile */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200">
                    <User className="w-5 h-5" />
                    <span>{displayName}</span>
                  </button>

                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#00274D]/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleDashboardClick}
                      className="w-full px-4 py-2 text-right text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      داشبورد
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-right text-red-400 hover:text-red-300 hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
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
                {isLoggedIn ? (
                  <>
                    <Button
                      onClick={handleDashboardClick}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-all duration-200"
                    >
                      داشبورد
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-lg transition-all duration-200"
                    >
                      خروج
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - بهبود یافته */}
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
              <img src={cesa} alt="ELMOCPC Logo" className="h-16 md:h-20" />
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

          <p
            className="text-lg md:text-xl mb-8 text-[#FFD500] animate-slide-up font-semibold"
            style={{ animationDelay: "0.3s" }}
          >
            🏆 اولین دوره حضوری - فرصت استثنایی برای رقابت و یادگیری
          </p>

          {/* Countdown Timer */}
          <div
            className="mb-12 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-sm text-[#FFD500] mb-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              زمان باقی‌مانده تا روز مسابقه
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
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[80px] transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-3xl font-bold text-[#FFD500]">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            {isLoggedIn ? (
              <>
                <Button
                  onClick={handleDashboardClick}
                  className="group relative bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
                >
                  <Trophy className="w-5 h-5 inline-block ml-2 group-hover:rotate-12 transition-transform" />
                  داشبورد و ادامه ی ثبت نام
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleRegisterClick}
                  className="group relative bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-6 px-12 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-[#FFD500]/50 hover:scale-105"
                >
                  <Trophy className="w-5 h-5 inline-block ml-2 group-hover:rotate-12 transition-transform" />
                  ثبت‌نام در مسابقه
                </Button>
                <Button
                  onClick={handleLoginClick}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-6 px-12 rounded-xl text-lg transition-all duration-300 hover:scale-105"
                >
                  ورود به حساب کاربری
                </Button>
              </>
            )}
          </div>

          {/* Additional Info */}
          <div
            className="mt-12 animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#46BEF6]" />
                <span>تیم‌های حداکثر ۳ نفره</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFD500]" />
                <span>۵ ساعت رقابت فشرده</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D7263D]" />
                <span>جوایز نقدی و هدیه های دیگر </span>
              </div>
            </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#46BEF6] via-[#FFD500] to-[#D7263D] bg-clip-text text-transparent">
            چرا در ELMOCPC شرکت کنیم؟
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم و صنعت، فرصتی
            استثنایی برای سنجش مهارت‌ها، یادگیری تیمی و آمادگی برای مسابقات ملی
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
              <feature.icon className="w-12 h-12 mb-4 text-[#FFD500]" />
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prizes Section */}
      <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#FFD500]/20 rounded-full border border-[#FFD500]/50">
              <span className="text-[#FFD500] font-semibold">🎁 جوایز</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              جوایز ارزشمند مسابقه
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              علاوه بر افتخار و اعتبار، جوایز نقدی و جوایز ویژه در انتظار
              تیم‌های برتر است
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}
                />
                <prize.medal className="w-12 h-12 mb-4 text-[#FFD500] mx-auto" />
                <h3 className="text-lg font-bold mb-2 text-white text-center">
                  {prize.rank}
                </h3>
                <p className="text-gray-300 text-sm text-center">
                  {prize.reward}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules Section */}
      <div id="rules" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-[#46BEF6]/20 rounded-full border border-[#46BEF6]/50">
            <span className="text-[#46BEF6] font-semibold">📋 قوانین</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            قوانین و شرایط مسابقه
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            برای شرکت در مسابقه، این شرایط را به دقت مطالعه کنید
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" dir="rtl">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${rule.color}20` }}
                >
                  <rule.icon
                    className="w-6 h-6"
                    style={{ color: rule.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {rule.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      {/* <div id="testimonials" className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-[#3DDC84]/20 rounded-full border border-[#3DDC84]/50">
              <span className="text-[#3DDC84] font-semibold">💬 نظرات</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              تجربه شرکت‌کنندگان قبلی
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              بشنوید از کسانی که در دوره‌های قبل ELMOCPC شرکت کرده‌اند
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].comment}"
                </p>
                <div className="text-white font-semibold">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-gray-400 text-sm">
                  {testimonials[activeTestimonial].university} -{" "}
                  {testimonials[activeTestimonial].year}
                </div>
              </div> */}

      {/* Navigation */}
      {/* <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex gap-2 items-center">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === activeTestimonial
                          ? "bg-[#FFD500]"
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Timeline Section */}
      <div id="timeline" className="py-20 container mx-auto px-4" dir="rtl">
        <div className="text-center mb-16">
          <div className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#46BEF6] to-[#FFD500] bg-clip-text text-transparent">
            برنامه زمانی مسابقه
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            از ثبت‌نام تا برگزاری مسابقه و مراسم اختتامیه
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => {
            const isLastItem = index === timeline.length - 1;
            const lineStatus = !isLastItem
              ? getLineStatus(item.status, timeline[index + 1].status)
              : null;

            return (
              <div
                key={index}
                className="relative flex items-center mb-8 last:mb-0 group"
              >
                {/* دایره وضعیت */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    item.status === "completed"
                      ? "bg-[#3DDC84] border-[#3DDC84]"
                      : item.status === "active"
                      ? "bg-[#FFD500] border-[#FFD500] animate-pulse"
                      : "bg-transparent border-white/30 group-hover:border-[#46BEF6]"
                  } z-10 transition-all duration-300`}
                >
                  {item.status === "completed" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* خط اتصال */}
                {!isLastItem && (
                  <div
                    className={`absolute left-3 top-6 w-0.5 h-16 transition-all duration-300 ${
                      lineStatus === "completed"
                        ? "bg-[#3DDC84]"
                        : lineStatus === "completed-to-active"
                        ? "bg-gradient-to-b from-[#3DDC84] to-[#FFD500]"
                        : lineStatus === "active-to-upcoming"
                        ? "bg-gradient-to-b from-[#FFD500] to-[#46BEF6]"
                        : lineStatus === "completed-to-upcoming"
                        ? "bg-gradient-to-b from-[#3DDC84] to-[#46BEF6]"
                        : "bg-white/20 group-hover:bg-[#46BEF6]"
                    }`}
                  />
                )}

                {/* کارت محتوا */}
                <div
                  className={`flex-1 mr-6 backdrop-blur-md border rounded-xl p-6 transition-all duration-300 group-hover:scale-105 ${
                    item.status === "completed"
                      ? "bg-[#3DDC84]/10 border-[#3DDC84]/30"
                      : item.status === "active"
                      ? "bg-[#FFD500]/10 border-[#FFD500]/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3
                        className={`text-xl font-bold mb-1 ${
                          item.status === "completed"
                            ? "text-[#3DDC84]"
                            : item.status === "active"
                            ? "text-[#FFD500]"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`${
                          item.status === "completed"
                            ? "text-[#3DDC84]/80"
                            : item.status === "active"
                            ? "text-[#FFD500]/80"
                            : "text-gray-400"
                        }`}
                      >
                        {item.date}
                      </p>
                    </div>

                    {/* بجک وضعیت */}
                    {item.status === "completed" && (
                      <span className="bg-[#3DDC84] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        تکمیل شده
                      </span>
                    )}
                    {item.status === "active" && (
                      <span className="bg-[#FFD500] text-[#00274D] px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#00274D] rounded-full animate-ping" />
                        در جریان
                      </span>
                    )}
                    {item.status === "upcoming" && (
                      <span className="bg-white/20 text-white/80 px-3 py-1 rounded-full text-sm font-semibold">
                        پیش رو
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-[#00274D] to-[#003D6B]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#46BEF6]/20 backdrop-blur-md border border-white/20 rounded-3xl p-12 text-center">
            <Trophy className="w-20 h-20 mx-auto mb-6 text-[#FFD500]" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              فرصت را از دست ندهید!
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              همین حالا در پنجمین دوره مسابقات برنامه‌نویسی دانشجویی دانشگاه علم
              و صنعت ثبت‌نام کنید و در رقابتی فراموش‌نشدنی شرکت نمایید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isLoggedIn ? (
                <Button
                  onClick={handleDashboardClick}
                  className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#FFD500]/50"
                >
                  <Trophy className="w-5 h-5 ml-2" />
                  ثبت‌نام نهایی تیم
                </Button>
              ) : (
                <Button
                  onClick={handleRegisterClick}
                  className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#FFD500]/50"
                >
                  <Sparkles className="w-5 h-5 ml-2" />
                  شروع ثبت‌نام
                </Button>
              )}
              <Button
                onClick={() => scrollToSection("rules")}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 border border-white/20"
              >
                مطالعه قوانین
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style>{`
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
            @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(255, 213, 0, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(255, 213, 0, 0);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-bounce-in {
    animation: bounce-in 0.6s ease-out;
  }
      `}</style>
    </div>
  );
}

export default ICPCLanding;
