import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Trophy, 
  Calendar, 
  Settings, 
  LogOut, 
  User, 
  Bell, 
  ChevronRight,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  BookOpen,
  Download,
  Edit,
  Plus
} from "lucide-react";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // چک کردن توکن و لود کردن اطلاعات کاربر
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          navigate("/login");
          return;
        }

        // دریافت اطلاعات کاربر
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
            return;
          }
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }

        const user = await userResponse.json();
        console.log("User data:", user);
        setUserData(user.data);

        // دریافت اطلاعات تیم اگر کاربر در تیمی است
        if (user.data?.teamId) {
          const teamResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/teams/${user.data.teamId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (teamResponse.ok) {
            const team = await teamResponse.json();
            setTeamData(team.data);
          }
        }
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  // داده‌های نمونه برای اطلاعیه‌ها
  const notifications = [
    {
      id: 1,
      title: "ثبت‌نام تیم تایید شد",
      message: "تیم شما با موفقیت ثبت و تایید شد",
      type: "success",
      date: "1404/01/16",
      read: false,
    },
    {
      id: 2,
      title: "مهلت ثبت‌نام",
      message: "30 روز تا پایان مهلت ثبت‌نام باقی مانده است",
      type: "warning",
      date: "1404/01/15",
      read: true,
    },
    {
      id: 3,
      title: "اطلاعیه مسابقه",
      message: "جزئیات مرحله مقدماتی اعلام شد",
      type: "info",
      date: "1404/01/10",
      read: true,
    },
  ];

  // رویدادهای پیش‌رو
  const upcomingEvents = [
    {
      title: "پایان ثبت‌نام",
      date: "1404/02/30",
      days: 45,
      type: "deadline",
    },
    {
      title: "مرحله مقدماتی",
      date: "1404/03/15",
      days: 60,
      type: "competition",
    },
    {
      title: "مرحله نهایی",
      date: "1404/04/20",
      days: 96,
      type: "competition",
    },
  ];

  const menuItems = [
    { id: "overview", label: "خانه", icon: User },
    { id: "team", label: "تیم من", icon: Users },
    { id: "schedule", label: "برنامه مسابقات", icon: Calendar },
    { id: "notifications", label: "اطلاعیه‌ها", icon: Bell },
    { id: "resources", label: "منابع آموزشی", icon: BookOpen },
    { id: "settings", label: "تنظیمات", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleCreateTeam = () => {
    navigate("/buildteam");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin mx-auto mb-4" />
          <p>درحال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "خطا در بارگذاری اطلاعات"}</p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D]"
          >
            بازگشت به ورود
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white" dir="rtl">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[#00274D]/95 backdrop-blur-md border-l border-white/10 transition-all duration-300 z-50 overflow-y-auto ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className={`p-6 ${!sidebarOpen && "hidden md:block"}`}>
          {/* Logo */}
          <div className={`flex items-center gap-3 mb-8 ${!sidebarOpen && "md:justify-center"}`}>
            <div className="p-2 bg-[#FFD500]/20 rounded-lg">
              <Trophy className="w-6 h-6 text-[#FFD500]" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold">ICPC 2025</h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            )}
          </div>

          {/* User Profile */}
          {sidebarOpen && (
            <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FFD500] rounded-full flex items-center justify-center text-[#00274D] font-bold text-xl mx-auto mb-3">
                {userData?.name?.charAt(0)}
                {userData?.familyName?.charAt(0) || userData?.name?.split(" ")[1]?.charAt(0)}
              </div>
              <h3 className="text-center font-semibold mb-1">
                {userData?.name} {userData?.familyName}
              </h3>
              <p className="text-center text-xs text-gray-400 mb-2">
                {teamData ? "کاپیتان تیم" : "عضو تیم"}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  فعال
                </span>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="space-y-2 mb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-[#FFD500] text-[#00274D]"
                    : "hover:bg-white/10 text-white"
                } ${!sidebarOpen && "md:justify-center"}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className={`w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 ${!sidebarOpen && "md:px-2"}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="mr-2">خروج</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "md:mr-64" : "md:mr-20"}`}>
        {/* Header */}
        <header className="bg-[#00274D]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${!sidebarOpen ? "" : "rotate-180"}`} />
              </button>
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                <Bell className="w-6 h-6" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-2">
                  سلام، {userData?.name}! 👋
                </h2>
                <p className="text-gray-300">
                  به داشبورد مسابقات ICPC 2025 خوش آمدید
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-10 h-10 text-blue-400" />
                    <span className="text-3xl font-bold">
                      {teamData?.members?.length || 0}
                    </span>
                  </div>
                  <h3 className="text-gray-300">اعضای تیم</h3>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-10 h-10 text-yellow-400" />
                    <span className="text-3xl font-bold">{upcomingEvents[0].days}</span>
                  </div>
                  <h3 className="text-gray-300">روز تا مسابقه</h3>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                    <span className="text-lg font-bold">تایید شده</span>
                  </div>
                  <h3 className="text-gray-300">وضعیت ثبت‌نام</h3>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-[#FFD500]" />
                  آخرین اطلاعیه‌ها
                </h3>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:bg-white/5 ${
                        !notification.read ? "bg-[#FFD500]/5 border-[#FFD500]/30" : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {notification.type === "success" && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                            {notification.type === "warning" && (
                              <AlertCircle className="w-5 h-5 text-yellow-400" />
                            )}
                            {notification.type === "info" && (
                              <Bell className="w-5 h-5 text-blue-400" />
                            )}
                            <h4 className="font-semibold">{notification.title}</h4>
                          </div>
                          <p className="text-sm text-gray-300">{notification.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#FFD500]" />
                  رویدادهای پیش‌رو
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FFD500]/20 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[#FFD500]" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-400">{event.date}</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#FFD500]">{event.days} روز</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-6">
              {teamData ? (
                <>
                  {/* Team Header */}
                  <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{teamData?.name}</h2>
                        <p className="text-gray-300">
                          تاریخ ثبت‌نام: {teamData?.createdAt || "نامشخص"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-white/10 hover:bg-white/20 text-white">
                          <Edit className="w-5 h-5 ml-2" />
                          ویرایش
                        </Button>
                        <Button className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D]">
                          <Download className="w-5 h-5 ml-2" />
                          دانلود کارت شرکت
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teamData?.members?.map((member: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-[#FFD500] rounded-full flex items-center justify-center text-[#00274D] font-bold text-lg">
                            {member.name?.charAt(0)}
                            {member.familyName?.charAt(0) || member.name?.split(" ")[1]?.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {member.name} {member.familyName}
                            </h3>
                            <span className="text-sm text-[#FFD500]">
                              {member.role || "عضو"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-4 h-4" />
                            <span>{member.phone}</span>
                          </div>
                          {member.studentId && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <Award className="w-4 h-4" />
                              <span>شماره دانشجویی: {member.studentId}</span>
                            </div>
                          )}
                          {member.university && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <BookOpen className="w-4 h-4" />
                              <span className="truncate">{member.university}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <Users className="w-20 h-20 mx-auto mb-6 text-gray-500" />
                  <h2 className="text-2xl font-bold mb-4">شما هنوز تیمی ندارید</h2>
                  <p className="text-gray-400 mb-8">برای شرکت در مسابقه، ابتدا یک تیم تشکیل دهید</p>
                  <Button
                    onClick={handleCreateTeam}
                    className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold px-8 py-3"
                  >
                    <Plus className="w-5 h-5 ml-2" />
                    تشکیل تیم جدید
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">برنامه زمانی مسابقات</h2>
                <div className="space-y-4">
                  {[
                    { title: "ثبت‌نام", date: "1404/01/15 - 1404/02/30", status: "active" },
                    { title: "مرحله مقدماتی", date: "1404/03/15", status: "upcoming" },
                    { title: "اعلام نتایج مقدماتی", date: "1404/03/20", status: "upcoming" },
                    { title: "مرحله نهایی", date: "1404/04/20", status: "upcoming" },
                    { title: "مراسم اهدای جوایز", date: "1404/04/25", status: "upcoming" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-200 ${
                        item.status === "active"
                          ? "bg-[#FFD500]/10 border-[#FFD500]/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-400">{item.date}</p>
                        </div>
                        {item.status === "active" && (
                          <span className="bg-[#FFD500] text-[#00274D] px-4 py-2 rounded-full text-sm font-semibold">
                            فعال
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 rounded-2xl border transition-all duration-200 ${
                    !notification.read
                      ? "bg-[#FFD500]/10 border-[#FFD500]/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {notification.type === "success" && (
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      )}
                      {notification.type === "warning" && (
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-yellow-400" />
                        </div>
                      )}
                      {notification.type === "info" && (
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Bell className="w-6 h-6 text-blue-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg">{notification.title}</h3>
                        <p className="text-sm text-gray-400">{notification.date}</p>
                      </div>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-[#FFD500] rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-gray-300">{notification.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "راهنمای شرکت در مسابقه", icon: BookOpen, color: "blue" },
                  { title: "سوالات متداول", icon: AlertCircle, color: "green" },
                  { title: "مسائل سال‌های گذشته", icon: Trophy, color: "yellow" },
                  { title: "منابع آموزشی الگوریتم", icon: Award, color: "purple" },
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <resource.icon className={`w-12 h-12 mb-4 text-${resource.color}-400`} />
                    <h3 className="font-bold text-lg">{resource.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">اطلاعات حساب کاربری</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">نام و نام خانوادگی</label>
                    <p className="text-lg font-semibold">
                      {userData?.name} {userData?.familyName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">ایمیل</label>
                    <p className="text-lg font-semibold">{userData?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">شماره موبایل</label>
                    <p className="text-lg font-semibold">{userData?.phone}</p>
                  </div>
                  {userData?.studentId && (
                    <div>
                      <label className="text-sm text-gray-400">شماره دانشجویی</label>
                      <p className="text-lg font-semibold">{userData?.studentId}</p>
                    </div>
                  )}
                  {userData?.university && (
                    <div>
                      <label className="text-sm text-gray-400">دانشگاه</label>
                      <p className="text-lg font-semibold">{userData?.university}</p>
                    </div>
                  )}
                  <Button className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] mt-4">
                    <Edit className="w-5 h-5 ml-2" />
                    ویرایش اطلاعات
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Logos */}
        <div className="fixed bottom-4 right-4 left-4 flex justify-between items-center pointer-events-none">
          <img src={CESA} alt="CESA Logo" className="w-16 opacity-50" />
          <img src={ELMOCPC} alt="ELMOCPC Logo" className="w-24 opacity-50" />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;