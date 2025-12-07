// src/pages/Dashboard.tsx
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
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Plus,
  ChevronLeft,
  Trash2,
  AlertTriangle,
  Upload,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

// استور احراز هویت
import useUserStore from "@/store/userStore/userStore";

import {
  getTeamForDashboardService,
  type DashboardTeam as DashboardTeamType,
  getUserRegistrationStatus,
  translateTeamStatus,
  getStatusColor,
  submitTeamService,
  deleteTeamService,
  getInvitesService,
  cancelInviteService,
  uploadReceiptService,
} from "@/services/teamService";

import type { TeamInvite } from "@/types/teamTypes";

// نوع ساده برای یوزر داخل داشبورد
type DashboardUser = {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  teamId?: number;
};

// تایپ TeamInvite براساس response واقعی
// type TeamInvite = {
//   id: string;
//   token: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   expires_at: string;
//   data: {
//     // ساختار داخلی data
//     team_id?: number;
//     role?: string;
//     // سایر فیلدها
//   };
// };

function Dashboard() {
  const navigate = useNavigate();
  const { authUser, clearAuth } = useUserStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState<DashboardUser | null>(null);
  const [teamData, setTeamData] = useState<DashboardTeamType>(null);
  const [loading, setLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [submitStep, setSubmitStep] = useState(1);
  // const [isSubmittingTeam, setIsSubmittingTeam] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentInfo] = useState({
    ticketPrice: 660000,
    cardNumber: "6104-3387-4761-8581",
    bankName: "بانک ملت مهدی تقی دولابی",
  });
  // تابع لغو فرآیند ثبت نهایی
  const handleCancelSubmit = () => {
    setShowFinalSubmitModal(false);
    setSubmitStep(1);
  };

  // تابع شروع فرآیند تایید دو مرحله‌ای (همان قبلی)
  const handleStartSubmitProcess = () => {
    setShowFinalSubmitModal(true);
    setSubmitStep(1);
  };

  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("fa-IR").format(price) + " هزار تومان  برای کل تیم"
    );
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    // بررسی نوع فایل
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isTypeAllowed =
      allowedTypes.includes(file.type) ||
      ["jpg", "jpeg", "png", "pdf"].includes(fileExtension || "");

    if (!isTypeAllowed) {
      toast.error("فرمت فایل مجاز نیست. فقط JPG, PNG, PDF قابل قبول است");
      return;
    }

    // بررسی حجم فایل (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم فایل باید کمتر از 5MB باشد");
      return;
    }

    setSelectedFile(file);
  };

  // تابع برای دریافت اطلاعات تیم
  const fetchTeamData = async () => {
    if (!authUser) return;

    setTeamLoading(true);
    try {
      const team = await getTeamForDashboardService();
      setTeamData(team);
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamData(null);
    } finally {
      setTeamLoading(false);
    }
  };

  const handleUploadReceipt = async (file: File) => {
    if (!teamData) return;

    try {
      setUploading(true);

      // ایجاد FormData
      const formData = new FormData();
      formData.append("receipt", file);

      console.log("آپلود فایل:", file.name, "برای تیم:", teamData.id);

      // فراخوانی سرویس آپلود
      await uploadReceiptService(teamData.id, formData);

      toast.success("فیش پرداخت با موفقیت آپلود شد");
      setShowUploadModal(false);
      setSelectedFile(null);
      setIsDragging(false);
      await fetchTeamData(); // رفرش اطلاعات تیم
    } catch (error: any) {
      console.error("Error uploading receipt:", error);
      toast.error(error?.message || "خطا در آپلود فیش");
    } finally {
      setUploading(false);
    }
  };

  // تابع برای دریافت دعوت‌نامه‌ها
  const fetchInvites = async () => {
    if (!teamData) return;

    setInvitesLoading(true);
    try {
      const response = await getInvitesService(teamData.id);
      setInvites(response.data);
      console.log("دریافت دعوت‌نامه‌ها:", response.data);
    } catch (error) {
      console.error("Error fetching invites:", error);
      setInvites([]);
    } finally {
      setInvitesLoading(false);
    }
  };

  // تابع handleCancelInvite
  const handleCancelInvite = async (inviteToken: string, inviteid: string) => {
    try {
      await cancelInviteService(inviteToken, inviteid);
      toast.success("دعوت با موفقیت لغو شد");
      fetchInvites(); // رفرش لیست دعوت‌نامه‌ها
    } catch (error: any) {
      console.error("Error canceling invite:", error);
      toast.error(error?.message || "خطا در لغو دعوت");
    }
  };

  function getRemainingMessage() {
    // تاریخ امروز
    const today = new Date();
    const targetDate = new Date("2025-12-11");

    const diffTime = targetDate.getTime() - today.getTime(); // ✔️ درست
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDaysLeft(diffDays);

    return `${diffDays} روز تا پایان مهلت ثبت‌نام باقی مانده است`;
  }

  // تابع برای تولید نوتیف‌ها براساس وضعیت تیم
  const getNotificationsBasedOnStatus = (
    teamData: DashboardTeamType | null
  ) => {
    if (!teamData) {
      return [
        {
          id: 1,
          title: "تشکیل تیم",
          message: "برای شرکت در مسابقه باید یک تیم تشکیل دهید",
          type: "warning",
          date: new Date().toLocaleDateString("fa-IR"),
          read: false,
        },
      ];
    }

    const baseNotifications = [];
    const today = new Date().toLocaleDateString("fa-IR");

    switch (teamData.status) {
      case "draft":
        baseNotifications.push({
          id: 1,
          title: "تیم در حالت پیش‌نویس",
          message: "لطفا اطلاعات تیم را تکمیل و ثبت نهایی کنید",
          type: "warning",
          date: today,
          read: false,
        });
        break;
      case "submitted":
        baseNotifications.push({
          id: 1,
          title: "تیم ثبت شد",
          message: "اطلاعات تیم با موفقیت ثبت شد. لطفا منتظر بمانید ",
          type: "success",
          date: today,
          read: false,
        });
        break;
      case "waiting_for_payment":
        baseNotifications.push({
          id: 1,
          title: "در انتظار پرداخت",
          message: "لطفا هزینه ثبت‌نام را پرداخت کنید",
          type: "warning",
          date: today,
          read: false,
        });
        break;
      case "receipt_pending":
        if (teamData.receipt_image_url) {
          baseNotifications.push({
            id: 1,
            title: "فیش آپلود شد",
            message: "فیش پرداختی شما با موفقیت آپلود شد و در انتظار تایید است",
            type: "info",
            date: today,
            read: false,
          });
        } else {
          baseNotifications.push({
            id: 1,
            title: "آپلود فیش",
            message: "لطفا فیش پرداختی را آپلود کنید",
            type: "warning",
            date: today,
            read: false,
          });
        }
        break;
      case "accepted":
        baseNotifications.push({
          id: 1,
          title: "تیم تایید شد",
          message: "تبریک! تیم شما برای شرکت در مسابقه تایید شد",
          type: "success",
          date: today,
          read: false,
        });
        break;
      case "rejected":
        baseNotifications.push({
          id: 1,
          title: "اطلاعات معتبر نیست",
          message:
            "تیم شما رد شده است. لطفا در صورت هرگونه ابهام با پشتبانی ارتباط بگیرید.",
          type: "error",
          date: today,
          read: false,
        });
        break;
    }

    baseNotifications.push(
      {
        id: 2,
        title: "مهلت ثبت‌نام",
        message: `${getRemainingMessage()} روز تا پایان مهلت ثبت‌نام باقی مانده است`,
        type: "info",
        date: today,
        read: true,
      },
      {
        id: 3,
        title: "اطلاعیه مسابقه",
        message: "جزئیات مرحله مقدماتی اعلام شد",
        type: "info",
        date: "۱۴۰۴/۰۹/۰۸",
        read: true,
      }
    );

    return baseNotifications;
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    const mappedUser: DashboardUser = {
      name: authUser.first_name,
      familyName: authUser.last_name,
      email: authUser.email,
      phone: authUser.phone,
      teamId: (authUser as any).teamId,
    };

    setUserData(mappedUser);
    fetchTeamData();
    setLoading(false);
  }, [authUser, navigate]);

  useEffect(() => {
    if (teamData && authUser) {
      // بررسی اینکه آیا کاربر فعلی کاپیتان تیم هست یا نه
      const captainStatus = teamData.creator_id === authUser.id;
      setIsCaptain(captainStatus);
      console.log(
        "وضعیت کاپیتان:",
        captainStatus,
        "User ID:",
        authUser.id,
        "Creator ID:",
        teamData.creator_id
      );
    }
  }, [teamData, authUser]);

  useEffect(() => {
    const newNotifications = getNotificationsBasedOnStatus(teamData);
    setNotifications(newNotifications);
  }, [teamData]);

  useEffect(() => {
    if (teamData) {
      fetchInvites();
    }
  }, [teamData]);
  // console.log(teamData.status)

  const refreshTeamData = () => {
    fetchTeamData();
  };

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setDeleteStep(1);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteStep(1);
  };

  const handleConfirmStep1 = () => {
    setDeleteStep(2);
  };

  const handleConfirmDelete = async () => {
    if (!teamData) return;

    try {
      setDeleting(true);
      await deleteTeamService(teamData.id);
      toast.success("تیم با موفقیت حذف شد!");
      setShowDeleteModal(false);
      await fetchTeamData();
    } catch (error: any) {
      console.error("Error deleting team:", error);
      toast.error(error?.message || "خطا در حذف تیم");
    } finally {
      setDeleting(false);
      setDeleteStep(1);
    }
  };

  const handleSubmitTeam = async () => {
    if (!teamData) {
      toast.error("تیم یافت نشد");
      return;
    }

    try {
      // setIsSubmittingTeam(true);
      await submitTeamService(teamData.id);
      toast.success("تیم با موفقیت ثبت نهایی شد!");
      setShowFinalSubmitModal(false);
      setSubmitStep(1);
      await fetchTeamData();
    } catch (error: any) {
      console.error("Error submitting team:", error);

      const errorMessage =
        error?.response?.data?.messages?.team?.pending_invitations ||
        "خطا در ثبت نهایی تیم";

      toast.error(errorMessage);
      setShowFinalSubmitModal(false);
      setSubmitStep(1);
    } finally {
      // setIsSubmittingTeam(false);
      setSubmitting(false);
    }
  };

  const handleCreateTeam = () => {
    navigate("/buildteam");
  };

  // const handleEditTeam = () => {
  //   if (teamData) {
  //     navigate(`/edit-team/${teamData.id}`);
  //   }
  // };

  const handleInviteMember = () => {
    if (teamData) {
      navigate(`/invitemember/`);
    }
  };

  const menuItems = [
    { id: "overview", label: "خانه", icon: User },
    { id: "team", label: "تیم من", icon: Users },
    { id: "schedule", label: "برنامه مسابقات", icon: Calendar },
    { id: "notifications", label: "اطلاعیه‌ها", icon: Bell },
    // { id: "resources", label: "منابع آموزشی", icon: BookOpen },
    { id: "settings", label: "تنظیمات", icon: Settings },
  ];

  console.log(teamData);

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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">کاربر یافت نشد</p>
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
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full bg-[#00274D]/95 backdrop-blur-md border-l border-white/10 transition-all duration-300 z-50 overflow-y-auto ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className={`p-6 ${!sidebarOpen && "hidden md:block"}`}>
          <div
            className={`flex items-center gap-3 mb-8 ${
              !sidebarOpen && "md:justify-center"
            }`}
          >
            <div className="p-2 bg-[#FFD500]/20 rounded-lg">
              <Trophy className="w-6 h-6 text-[#FFD500]" />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-[#ffffff]">ELMO</span>
                  <span className="text-[#46BEF6]">C</span>
                  <span className="text-[#D7263D]">P</span>
                  <span className="text-[#FFD500]">C</span>
                  <span className="text-white"> 2025</span>
                </h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            )}
          </div>

          <nav className="space-y-2 mb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-[#FFD500] text-[#00274D]"
                    : "hover:bg-white/10 text-white"
                } ${!sidebarOpen && "md:justify-center"}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          <Button
            onClick={handleLogout}
            className={`w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 ${
              !sidebarOpen && "md:px-2"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="mr-2">خروج</span>}
          </Button>
        </div>
      </aside>

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:mr-64" : "md:mr-20"
        }`}
      >
        <header className="bg-[#00274D]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <ChevronLeft
                  className={`w-6 h-6 transition-transform duration-300 ${
                    sidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <button
                onClick={() => navigate("/")}
                className="hidden md:inline-block px-4 py-2 text-sm font-medium bg-[#FFD500] text-[#00274D] rounded-lg hover:bg-[#ffea80] transition-all duration-200"
              >
                صفحه اصلی
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFD500] to-[#ffea80] text-[#00274D] font-bold text-lg shadow-md">
                  {userData.name?.charAt(0)}
                  {userData.familyName?.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {userData.name} {userData.familyName}
                  </span>
                  <span className="text-[11px] text-gray-300">
                    {teamData
                      ? isCaptain
                        ? "کاپیتان تیم"
                        : "عضو تیم"
                      : "بدون تیم"}
                  </span>
                </div>
                <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  فعال
                </span>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-2">
                  سلام، {userData.name}! 👋
                </h2>
                <p className="text-gray-300">
                  به داشبورد مسابقات ELMOCPC 2025 خوش آمدید
                </p>
              </div>

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
                    <span className="text-3xl font-bold">{daysLeft}</span>
                  </div>
                  <h3 className="text-gray-300">روز تا مسابقه</h3>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        getUserRegistrationStatus(teamData).color
                      }`}
                    >
                      {getUserRegistrationStatus(teamData).text}
                    </span>
                  </div>
                  <h3 className="text-gray-300">وضعیت ثبت‌نام</h3>
                </div>
              </div>
              {teamData?.status === "waiting_for_payment" && (
                <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6 space-y-6 mb-12">
                  {/* عنوان */}
                  <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
                    <Receipt className="w-6 h-6" />
                    آپلود فیش پرداخت
                  </h3>

                  {/* اطلاعات پرداخت */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">
                        مبلغ قابل پرداخت
                      </p>
                      <p className="text-lg font-bold text-[#FFD500]">
                        {formatPrice(paymentInfo.ticketPrice)}
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">شماره کارت</p>
                      <p
                        className="text-lg font-bold text-green-400 font-mono text-right"
                        dir="ltr"
                      >
                        {paymentInfo.cardNumber}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {paymentInfo.bankName}
                      </p>
                    </div>
                  </div>

                  {/* متن راهنما */}
                  <p className="text-gray-300 text-sm">
                    لطفا پس از واریز مبلغ، فیش پرداخت را آپلود کنید.
                  </p>

                  {/* دکمه آپلود */}
                  <Button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 justify-center w-full md:w-auto"
                  >
                    <Upload className="w-5 h-5" />
                    آپلود فیش
                  </Button>
                </div>
              )}
              {/* بخش اطلاع‌رسانی برای تمام وضعیت‌ها */}
              {teamData?.status === "draft" && (
                <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertCircle className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">
                        تیم در حالت پیش‌نویس
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          ثبت‌نام شما هنوز تکمیل نشده است. برای تکمیل فرآیند
                          ثبت‌نام، لطفاً مراحل زیر را انجام دهید:
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span>اعضای تیم را دعوت کنید (حداقل ۳ نفر)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span>
                              منتظر بمانید تا اعضای دعوت شده invitation را قبول
                              کنند
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span>
                              پس از تکمیل اعضا، روی دکمه "ثبت نهایی تیم" کلیک
                              کنید
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span>
                              پس از ثبت نهایی، منتظر تایید از سمت ادمین‌ها باشید
                              سپس هزینه ثبت‌نام را پرداخت و فیش را آپلود کنید
                            </span>
                          </li>
                        </ul>
                        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 mt-3">
                          <p className="text-xs text-yellow-400 font-medium">
                            💡 توجه: تا زمانی که تیم در حالت پیش‌نویس است، امکان
                            ویرایش اطلاعات تیم وجود دارد. پس از ثبت نهایی،
                            ویرایش امکان‌پذیر نخواهد بود.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamData?.status === "submitted" && (
                <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">
                        تیم ثبت نهایی شده است
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          تیم شما با موفقیت ثبت نهایی شد. در حال حاضر وضعیت شما
                          به شرح زیر است:
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>
                              تیم شما برای بررسی به ادمین‌ها ارسال شده است
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>
                              لطفاً منتظر تایید نهایی از سوی ادمین‌ها باشید
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>
                              پس از تایید ادمین‌ها، می‌توانید هزینه ثبت‌نام را
                              پرداخت کنید
                            </span>
                          </li>
                        </ul>
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mt-3">
                          <p className="text-xs text-blue-400 font-medium">
                            ⏳ زمان بررسی معمولاً ۲۴ تا ۴۸ ساعت طول می‌کشد
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamData?.status === "waiting_for_payment" && (
                <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Receipt className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-orange-400 mb-3">
                        در انتظار پرداخت
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          تیم شما توسط ادمین‌ها تایید شده است. لطفاً برای تکمیل
                          ثبت‌نام:
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>
                              هزینه ثبت‌نام را به شماره کارت مشخص شده واریز کنید
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>
                              پس از واریز، فیش پرداختی را در سیستم آپلود کنید
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>
                              پس از آپلود فیش، وضعیت شما به "در انتظار تایید
                              فیش" تغییر خواهد کرد
                            </span>
                          </li>
                        </ul>
                        <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 mt-3">
                          <p className="text-xs text-orange-400 font-medium">
                            💰 مبلغ قابل پرداخت:{" "}
                            {formatPrice(paymentInfo.ticketPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamData?.status === "receipt_pending" && (
                <div className="bg-purple-500/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Upload className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-400 mb-3">
                        {teamData.receipt_image_url
                          ? "فیش آپلود شده"
                          : "در انتظار آپلود فیش"}
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          {teamData.receipt_image_url
                            ? "فیش پرداختی شما با موفقیت آپلود شده است. وضعیت فعلی:"
                            : "لطفاً برای تکمیل فرآیند ثبت‌نام:"}
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          {teamData.receipt_image_url ? (
                            <>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>
                                  فیش پرداختی شما توسط ادمین‌ها در حال بررسی است
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>
                                  پس از تایید فیش، وضعیت شما به "تایید شده"
                                  تغییر خواهد کرد
                                </span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>
                                  هزینه ثبت‌نام را واریز کرده و فیش را آپلود
                                  کنید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>فرمت‌های قابل قبول: JPG, PNG, PDF</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>حداکثر حجم فایل: 5MB</span>
                              </li>
                            </>
                          )}
                        </ul>
                        {!teamData.receipt_image_url && (
                          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 mt-3">
                            <p className="text-xs text-purple-400 font-medium">
                              📎 برای آپلود فیش از دکمه "آپلود فیش" استفاده کنید
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamData?.status === "accepted" && (
                <div className="bg-green-500/10 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-400 mb-3">
                        تیم تایید شده است
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          تبریک! ثبت‌نام شما با موفقیت تکمیل شد. وضعیت فعلی شما:
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>
                              تیم شما برای شرکت در مسابقه تایید شده است
                            </span>
                          </li>
                        
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>
                              منتظر اطلاعیه‌های بعدی برای زمان مسابقه باشید
                            </span>
                          </li>
                        </ul>
                        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mt-3">
                          <p className="text-xs text-green-400 font-medium">
                            🎉 موفق باشید در مسابقه!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teamData?.status === "rejected" && (
                <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-400 mb-3">
                        تیم رد شده است
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="text-sm leading-relaxed">
                          متأسفانه تیم شما توسط ادمین‌ها رد شده است. دلایل
                          احتمالی:
                        </p>
                        <ul className="space-y-2 text-sm mr-4">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span>مشکل در اطلاعات اعضای تیم</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span>فیش پرداختی نامعتبر</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span>عدم رعایت قوانین مسابقه</span>
                          </li>
                        </ul>
                        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mt-3">
                          <p className="text-xs text-red-400 font-medium">
                            📞 در صورت نیاز به اطلاعات بیشتر با پشتیبانی تماس
                            بگیرید
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                        !notification.read
                          ? "bg-[#FFD500]/5 border-[#FFD500]/30"
                          : "bg-white/5 border-white/10"
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
                            {notification.type === "error" && (
                              <AlertCircle className="w-5 h-5 text-red-400" />
                            )}
                            <h4 className="font-semibold">
                              {notification.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-300">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {notification.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
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
                      <span className="text-2xl font-bold text-[#FFD500]">
                        {event.days} روز
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              {teamLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin mx-auto mb-4" />
                  <p>درحال بارگذاری اطلاعات تیم...</p>
                </div>
              ) : teamData ? (
                <>
                  <div className="bg-gradient-to-r from-[#FFD500]/20 to-[#FFD500]/5 backdrop-blur-md border border-[#FFD500]/30 rounded-2xl p-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">
                          {teamData.name}
                        </h2>
                        <p className="text-gray-300 mb-2">
                          {teamData.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              teamData.status
                            )}`}
                          >
                            {translateTeamStatus(teamData.status)}
                          </span>
                          {teamData.receipt_image_url && (
                            <span className="text-green-400 text-sm">
                              ✓ فیش آپلود شده
                            </span>
                          )}
                        </div>
                      </div>

                      {/* بخش اطلاع‌رسانی برای اعضای غیرکاپیتان */}
                      {teamData && !isCaptain && (
                        <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6">
                          <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-blue-400" />
                            <div>
                              <h3 className="font-bold text-blue-400 mb-2">
                                شما عضو تیم هستید
                              </h3>
                              <p className="text-gray-300 text-sm">
                                برای تغییرات در تیم (ثبت نهایی، دعوت عضو، حذف
                                تیم) با کاپیتان تیم تماس بگیرید.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-3 flex-wrap">
                        {teamData.status === "draft" && (
                          <Button
                            onClick={handleStartSubmitProcess}
                            disabled={submitting || !isCaptain}
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 disabled:opacity-50"
                          >
                            {submitting ? (
                              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin ml-2" />
                            ) : (
                              <CheckCircle className="w-5 h-5 ml-2" />
                            )}
                            ثبت نهایی تیم
                          </Button>
                        )}

                        {(!invites || invites.length !== 2) &&
                          (teamData.status === "draft" || !teamData) && (
                            <Button
                              onClick={handleInviteMember}
                              disabled={!isCaptain}
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                            >
                              <Plus className="w-5 h-5 ml-2" />
                              دعوت عضو
                            </Button>
                          )}

                        {/* بخش آپلود فیش در تیم من */}
                        {teamData &&
                          teamData.status === "waiting_for_payment" && (
                            <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-orange-400">
                                    <Receipt className="w-6 h-6" />
                                    آپلود فیش پرداخت
                                  </h3>
                                  <p className="text-gray-300 ml-12">
                                    وضعیت: در انتظار آپلود فیش پرداخت
                                  </p>
                                </div>
                                <Button
                                  onClick={() => setShowUploadModal(true)}
                                  disabled={!isCaptain}
                                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30"
                                >
                                  <Upload className="w-5 h-5 ml-2" />
                                  آپلود فیش
                                </Button>
                              </div>
                            </div>
                          )}
                        {teamData.status == "rejected" && (
                          <p className="text-red-400 ml-4">
                            تیم شما رد شده است. لطفا دوباره اکانت بسازید یا با
                            پشتیبانی در ارتباط باشید.
                          </p>
                        )}

                        {/* {teamData.status === "accepted" && (
                          <Button className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D]">
                            <Download className="w-5 h-5 ml-2" />
                            دانلود کارت شرکت
                          </Button>
                        )} */}

                        {teamData.status === "draft" && (
                          <Button
                            onClick={handleDeleteClick}
                            disabled={!isCaptain || deleting}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                          >
                            <Trash2 className="w-5 h-5 ml-2" />
                            حذف تیم
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* بخش اطلاع‌رسانی برای تمام وضعیت‌ها */}
                  {teamData.status === "draft" && (
                    <div className="bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <AlertCircle className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-yellow-400 mb-3">
                            تیم در حالت پیش‌نویس
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              ثبت‌نام شما هنوز تکمیل نشده است. برای تکمیل فرآیند
                              ثبت‌نام، لطفاً مراحل زیر را انجام دهید:
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>
                                  اعضای تیم را دعوت کنید (حداکثر ۳ نفر)
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>
                                  منتظر بمانید تا اعضای دعوت شده invitation را
                                  قبول کنند
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>
                                  پس از تکمیل اعضا، روی دکمه "ثبت نهایی تیم"
                                  کلیک کنید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>
                                  پس از ثبت نهایی، منتظر تایید از سمت ادمین‌ها
                                  باشید سپس هزینه ثبت‌نام را پرداخت و فیش را
                                  آپلود کنید
                                </span>
                              </li>
                            </ul>
                            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-yellow-400 font-medium">
                                💡 توجه: تا زمانی که تیم در حالت پیش‌نویس است،
                                امکان ویرایش اطلاعات تیم وجود دارد. پس از ثبت
                                نهایی، ویرایش امکان‌پذیر نخواهد بود.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showFinalSubmitModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-[#00274D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-xl">
                        {submitStep === 1 ? (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-blue-400" />
                              </div>
                              <h3 className="text-lg font-bold">
                                تایید ثبت نهایی تیم
                              </h3>
                            </div>

                            <div className="space-y-4 mb-6">
                              <p className="text-gray-300">
                                آیا از ثبت نهایی تیم{" "}
                                <span className="text-[#FFD500] font-semibold">
                                  {teamData?.name}
                                </span>{" "}
                                مطمئن هستید؟
                              </p>

                              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                                  <div>
                                    <h4 className="font-bold text-yellow-400 text-sm mb-1">
                                      توجه مهم!
                                    </h4>
                                    <ul className="text-xs text-yellow-300 space-y-1">
                                      <li>
                                        • پس از ثبت نهایی، امکان ویرایش تیم وجود
                                        نخواهد داشت
                                      </li>
                                      <li>
                                        • امکان دعوت عضو جدید غیرفعال می‌شود
                                      </li>
                                      <li>• این عمل غیرقابل بازگشت است</li>
                                      <li>
                                        • تیم را تکمیل و سپس برای نهایی کردن
                                        اقدام کنید
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-300">
                                    اعضای فعلی:
                                  </span>
                                  <span className="font-bold">
                                    {teamData?.members?.length || 0} نفر
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                onClick={handleCancelSubmit}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                              >
                                انصراف
                              </Button>
                              <Button
                                onClick={handleSubmitTeam}
                                disabled={invites?.length > 0}
                                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 disabled:opacity-50"
                              >
                                {invites?.length > 0
                                  ? "دعوت‌های در انتظار دارید"
                                  : "ادامه"}
                              </Button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {teamData.status === "submitted" && (
                    <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-blue-400 mb-3">
                            تیم ثبت نهایی شده است
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              تیم شما با موفقیت ثبت نهایی شد. در حال حاضر وضعیت
                              شما به شرح زیر است:
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>
                                  تیم شما برای بررسی به ادمین‌ها ارسال شده است
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>
                                  لطفاً منتظر تایید نهایی از سوی ادمین‌ها باشید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>
                                  پس از تایید ادمین‌ها، می‌توانید هزینه ثبت‌نام
                                  را پرداخت کنید
                                </span>
                              </li>
                            </ul>
                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-blue-400 font-medium">
                                ⏳ زمان بررسی معمولاً ۱ تا ۶ ساعت طول می‌کشد
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {teamData.status === "waiting_for_payment" && (
                    <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Receipt className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-orange-400 mb-3">
                            در انتظار پرداخت
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              تیم شما توسط ادمین‌ها تایید شده است. لطفاً برای
                              تکمیل ثبت‌نام:
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span>
                                  هزینه ثبت‌نام را به شماره کارت مشخص شده واریز
                                  کنید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span>
                                  پس از واریز، فیش پرداختی را در سیستم آپلود
                                  کنید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span>
                                  پس از آپلود فیش، وضعیت شما به "در انتظار تایید
                                  فیش" تغییر خواهد کرد
                                </span>
                              </li>
                            </ul>
                            <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-orange-400 font-medium">
                                💰 مبلغ قابل پرداخت:{" "}
                                {formatPrice(paymentInfo.ticketPrice)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {teamData.status === "receipt_pending" && (
                    <div className="bg-purple-500/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <Upload className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-purple-400 mb-3">
                            {teamData.receipt_image_url
                              ? "فیش آپلود شده"
                              : "در انتظار آپلود فیش"}
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              {teamData.receipt_image_url
                                ? "فیش پرداختی شما با موفقیت آپلود شده است. وضعیت فعلی:"
                                : "لطفاً برای تکمیل فرآیند ثبت‌نام:"}
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              {teamData.receipt_image_url ? (
                                <>
                                  <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>
                                      فیش پرداختی شما توسط ادمین‌ها در حال بررسی
                                      است
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>
                                      پس از تایید فیش، وضعیت شما به "تایید شده"
                                      تغییر خواهد کرد
                                    </span>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>
                                      هزینه ثبت‌نام را واریز کرده و فیش را آپلود
                                      کنید
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>
                                      فرمت‌های قابل قبول: JPG, PNG, PDF
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>حداکثر حجم فایل: 5MB</span>
                                  </li>
                                </>
                              )}
                            </ul>
                            {!teamData.receipt_image_url && (
                              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 mt-3">
                                <p className="text-xs text-purple-400 font-medium">
                                  📎 برای آپلود فیش از دکمه "آپلود فیش" استفاده
                                  کنید
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* اطلاعات پرداخت */}
                  {teamData.status === "waiting_for_payment" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">
                          مبلغ قابل پرداخت
                        </p>
                        <p className="text-lg font-bold text-[#FFD500]">
                          {formatPrice(paymentInfo.ticketPrice)}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">شماره کارت</p>
                        <p
                          className="text-lg font-bold text-green-400 font-mono text-right"
                          dir="ltr"
                        >
                          {paymentInfo.cardNumber}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {paymentInfo.bankName}
                        </p>
                      </div>
                    </div>
                  )}
                  {teamData?.status === "accepted" && (
                    <div className="bg-green-500/10 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-green-400 mb-3">
                            تیم تایید شده است
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              تبریک! ثبت‌نام شما با موفقیت تکمیل شد. وضعیت فعلی
                              شما:
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>
                                  تیم شما برای شرکت در مسابقه تایید شده است
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>
                                  ۲۱ آذر ساعت ۸ صبح در محل مسابقه حضور داشته
                                  باشید
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>
                                  منتظر اطلاعیه‌های بعدی برای زمان مسابقه باشید
                                </span>
                              </li>
                            </ul>
                            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-green-400 font-medium">
                                🎉 موفق باشید در مسابقه!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {teamData?.status === "rejected" && (
                    <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-red-400 mb-3">
                            تیم رد شده است
                          </h3>
                          <div className="space-y-3 text-gray-300">
                            <p className="text-sm leading-relaxed">
                              متأسفانه تیم شما توسط ادمین‌ها رد شده است. دلایل
                              احتمالی:
                            </p>
                            <ul className="space-y-2 text-sm mr-4">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>مشکل در اطلاعات اعضای تیم</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>فیش پرداختی نامعتبر</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>عدم رعایت قوانین مسابقه</span>
                              </li>
                            </ul>
                            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3 mt-3">
                              <p className="text-xs text-red-400 font-medium">
                                📞 در صورت نیاز به اطلاعات بیشتر با پشتیبانی
                                تماس بگیرید
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-[#00274D] border border-white/10 rounded-2xl p-6 max-w-md w-full">
                        {deleteStep === 1 ? (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                              </div>
                              <h3 className="text-lg font-bold">
                                هشدار حذف تیم
                              </h3>
                            </div>
                            <p className="text-gray-300 mb-6">
                              آیا از حذف تیم{" "}
                              <span className="text-[#FFD500] font-semibold">
                                {teamData.name}
                              </span>{" "}
                              مطمئن هستید؟ این عمل غیرقابل بازگشت است و تمام
                              اطلاعات تیم حذف خواهد شد.
                            </p>
                            <div className="flex gap-3">
                              <Button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                              >
                                انصراف
                              </Button>
                              <Button
                                onClick={handleConfirmStep1}
                                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                              >
                                ادامه
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                              </div>
                              <h3 className="text-lg font-bold">تایید نهایی</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                              برای حذف نهایی تیم، لطفا عبارت زیر را تایپ کنید:
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                              <p className="text-center text-[#FFD500] font-mono text-lg">
                                حذف تیم {teamData.name}
                              </p>
                            </div>
                            <p className="text-sm text-gray-400 mb-4 text-center">
                              لطفا عبارت بالا را عیناً کپی کرده و در کادر زیر
                              پیست کنید
                            </p>
                            <input
                              type="text"
                              placeholder={`حذف تیم ${teamData.name}`}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 mb-4"
                              onChange={(e) => {
                                if (
                                  e.target.value === `حذف تیم ${teamData.name}`
                                )
                                  setDeleteStep(3);
                              }}
                            />
                            <div className="flex gap-3">
                              <Button
                                onClick={() => setDeleteStep(1)}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                              >
                                بازگشت
                              </Button>
                              <Button
                                onClick={handleConfirmDelete}
                                disabled={deleteStep !== 3 || deleting}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {deleting ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                                    در حال حذف...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="w-5 h-5 ml-2" />
                                    حذف نهایی
                                  </>
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {invitesLoading ? (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
                      <div className="flex items-center justify-center py-4">
                        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin" />
                        <span className="mr-2 text-sm md:text-base">
                          درحال بارگذاری دعوت‌نامه‌ها...
                        </span>
                      </div>
                    </div>
                  ) : (
                    invites?.length > 0 &&
                    isCaptain && (
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2 text-[#FFD500]">
                          <Bell className="w-5 h-5 md:w-6 md:h-6" />
                          دعوت‌نامه‌های در انتظار پاسخ
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs md:text-sm">
                            {invites.length} دعوت
                          </span>
                        </h3>
                        <div className="space-y-3">
                          {invites.map((invite) => (
                            <div
                              key={invite.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl gap-3"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm md:text-base truncate">
                                    {invite.first_name} {invite.last_name}
                                  </h4>
                                  <p className="text-xs md:text-sm text-gray-300 truncate">
                                    {invite.email}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    انقضا:{" "}
                                    {new Date(
                                      invite.expires_at
                                    ).toLocaleDateString("fa-IR")}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 justify-between sm:justify-end">
                                <span className="text-yellow-400 text-xs md:text-sm whitespace-nowrap">
                                  در انتظار پاسخ
                                </span>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleCancelInvite(
                                      invite.token.toString(),
                                      teamData.id.toString()
                                    )
                                  }
                                  disabled={invitesLoading || !isCaptain}
                                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                                >
                                  لغو دعوت
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#FFD500]">
                      <Users className="w-6 h-6" />
                      اعضای تیم
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {teamData.members.map((member, index) => (
                        <div
                          key={member.id}
                          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-[#FFD500] rounded-full flex items-center justify-center text-[#00274D] font-bold text-lg">
                              {member.name?.charAt(0)}
                              {member.familyName?.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">
                                {member.name} {member.familyName}
                              </h3>
                              <span className="text-sm text-[#FFD500]">
                                {index === 0 ? "کاپیتان" : "عضو تیم"}
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
                            <div className="flex items-center gap-2 text-green-400 text-xs">
                              <CheckCircle className="w-3 h-3" />
                              <span>عضو تایید شده</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* دکمه رفرش */}
                  <div className="text-center">
                    <Button
                      onClick={refreshTeamData}
                      className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      بروزرسانی اطلاعات تیم
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <Users className="w-20 h-20 mx-auto mb-6 text-gray-500" />
                  <h2 className="text-2xl font-bold mb-4">
                    شما هنوز تیمی ندارید
                  </h2>
                  <p className="text-gray-400 mb-8">
                    برای شرکت در مسابقه، ابتدا یک تیم تشکیل دهید
                  </p>
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

          {/* سایر تب‌ها (schedule, notifications, resources, settings) بدون تغییر باقی می‌مانند */}
          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">
                  برنامه زمانی مسابقات
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "ثبت‌نام",
                      date: "۱۴۰۴/۰۹/۰۹-۱۴۰۴/۰۹/۱۵",
                      status: "active",
                    },
                    {
                      title: " مسابقه",
                      date: "۱۴۰۴/۰۹/۲۱ ساعت ۸:۰۰",
                      status: "upcoming",
                    },
                    {
                      title: "مراسم اهدای جوایز",
                      date: "۱۴۰۴/۰۹/۲۱ ساعت ۱۶:۰۰",
                      status: "upcoming",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all	duration-200 ${
                        item.status === "active"
                          ? "bg-[#FFD500]/10 border-[#FFD500]/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {item.title}
                          </h3>
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
                      {notification.type === "error" && (
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {notification.date}
                        </p>
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
          {/* {activeTab === "resources" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "راهنمای شرکت در مسابقه",
                    icon: BookOpen,
                  },
                  {
                    title: "سوالات متداول",
                    icon: AlertCircle,
                  },
                  {
                    title: "مسائل سال‌های گذشته",
                    icon: Trophy,
                  },
                  {
                    title: "منابع آموزشی الگوریتم",
                    icon: Award,
                  },
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all	duration-200 cursor-pointer"
                  >
                    <resource.icon className="w-12 h-12 mb-4 text-[#FFD500]" />
                    <h3 className="font-bold text-lg">{resource.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">اطلاعات حساب کاربری</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">
                      نام و نام خانوادگی
                    </label>
                    <p className="text-lg font-semibold">
                      {userData.name} {userData.familyName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">ایمیل</label>
                    <p className="text-lg font-semibold">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">
                      شماره موبایل
                    </label>
                    <p className="text-lg font-semibold">{userData.phone}</p>
                  </div>
                  {/* <Button className="bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] mt-4">
                    <Edit className="w-5 h-5 ml-2" />
                    ویرایش اطلاعات
                  </Button> */}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="fixed bottom-4 right-4 left-4 flex justify-between items-center pointer-events-none">
          <img src={CESA} alt="CESA Logo" className="w-16 opacity-50" />
          <img src={ELMOCPC} alt="ELMOCPC Logo" className="w-24 opacity-50" />
        </div> */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#00274D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-xl">
              {/* عنوان */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  آپلود فیش پرداخت
                </h3>
              </div>

              {/* Dropzone */}
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    handleFileSelect(file);
                  }
                }}
                className={`
          border-2 border-dashed rounded-xl p-6 min-h-[200px] 
          flex flex-col items-center justify-center cursor-pointer transition
          ${
            isDragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-orange-500/30"
          }
        `}
                onClick={() =>
                  document.getElementById("receipt-input")?.click()
                }
              >
                <Receipt className="w-12 h-12 text-orange-400 mb-3" />

                {!selectedFile ? (
                  <>
                    <p className="text-gray-200 mb-1">فایل را اینجا رها کنید</p>
                    <p className="text-sm text-gray-400">
                      یا کلیک کنید برای انتخاب
                    </p>
                  </>
                ) : (
                  <p className="text-green-300 font-medium">
                    {selectedFile.name} انتخاب شد ✔
                  </p>
                )}

                <input
                  id="receipt-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedFile(file);
                  }}
                />
              </div>

              {/* توضیحات */}
              <div className="text-xs text-gray-400 mt-4 mb-6 text-center leading-relaxed">
                <p>فرمت‌های قابل قبول: JPG, PNG, PDF</p>
                <p>حداکثر حجم: 5MB</p>
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                  disabled={uploading}
                >
                  انصراف
                </Button>

                <Button
                  onClick={() => {
                    if (selectedFile) handleUploadReceipt(selectedFile);
                  }}
                  className="flex-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
                  disabled={!selectedFile || uploading}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin ml-2" />
                      در حال آپلود...
                    </>
                  ) : (
                    "آپلود فایل"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
