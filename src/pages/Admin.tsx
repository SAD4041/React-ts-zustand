import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  CheckCircle,
  XCircle,
  Users,
  Mail,
  Phone,
  Award,
  LogOut,
  Menu,
  X,
  Eye,
  RefreshCw,
  FileText,
  CreditCard,
  Receipt,
  ExternalLink,
  // User,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchTeamsService,
  approveTeamService,
  rejectTeamService,
  fetchUsersService,
  verifyReceiptService,
  fetchPendingReceiptsService,
  type Team,
  type User,
} from "@/services/adminServices";

type TeamStatus =
  | "draft"
  | "submitted"
  | "waiting_for_payment"
  | "receipt_pending"
  | "accepted"
  | "rejected";
type ActiveTab = "teams" | "users";
type Receipt = {
  id: number;
  team_id: number;
  [key: string]: any;
};

function AdminTeamsApproval() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<TeamStatus | "all">(
    "submitted"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [approving, setApproving] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("teams");
  const [verifyingReceipt, setVerifyingReceipt] = useState<number | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<{
    id: number;
    teamName: string;
    teamId?: number; // اضافه کردن teamId
    approved?: boolean;
  } | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [pendingReceipts, setPendingReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    if (activeTab === "teams") {
      fetchTeams();
      fetchPendingReceipts();
    } else {
      fetchUsers();
    }
  }, [activeTab]);
  // تابع جدید برای دریافت receipts
  const fetchPendingReceipts = async () => {
    try {
      const receipts = await fetchPendingReceiptsService();
      setPendingReceipts(receipts);
    } catch (err: any) {
      console.error("Error fetching pending receipts:", err);
      toast.error("خطا در دریافت لیست فیش‌های در انتظار");
    }
  };
  const findReceiptIdByTeamId = (teamId: number): number | null => {
    const receipt = pendingReceipts.find(
      (receipt) => receipt.team_id === teamId
    );
    return receipt ? receipt.id : null;
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      const teamsData = await fetchTeamsService();
      setTeams(teamsData);
    } catch (err: any) {
      console.error("Error fetching teams:", err);
      setError(err.message);
      toast.error("خطا در بارگذاری تیم‌ها");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerifyReceipt = async (receiptId: number, approved: boolean) => {
    try {
      setVerifyingReceipt(receiptId);

      // const payload: VerifyReceiptPayload = {
      //   approved: approved,
      //   notes: verificationNotes || undefined,
      // };

      await verifyReceiptService(receiptId, approved, verificationNotes);

      if (approved) {
        toast.success("فیش پرداخت با موفقیت تایید شد");
      } else {
        toast.success("فیش پرداخت رد شد");
      }

      setShowReceiptModal(false);
      setVerificationNotes("");
      setSelectedReceipt(null);

      await fetchTeams();
      await fetchPendingReceipts();
    } catch (err: any) {
      console.error("Error verifying receipt:", err);
      toast.error(err.message || "خطا در تایید فیش");
    } finally {
      setVerifyingReceipt(null);
    }
  };

  const handleOpenReceiptModal = (teamId: number, teamName: string) => {
    // پیدا کردن receipt_id بر اساس team_id
    const receiptId = findReceiptIdByTeamId(teamId);

    if (!receiptId) {
      toast.error("فیش پرداختی برای این تیم یافت نشد");
      return;
    }

    setSelectedReceipt({
      id: receiptId,
      teamName,
      teamId, // اضافه کردن teamId برای استفاده احتمالی
    });
    setShowReceiptModal(true);
  };

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      const usersData = await fetchUsersService();
      setUsers(usersData);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message);
      toast.error("خطا در بارگذاری کاربران");
    } finally {
      setUsersLoading(false);
    }
  };

  const handleRefresh = () => {
    if (activeTab === "teams") {
      setRefreshing(true);
      fetchTeams();
      fetchPendingReceipts();
    } else {
      fetchUsers();
    }
  };

  const handleApproveTeam = async (teamId: number) => {
    try {
      setApproving(teamId);
      await approveTeamService(teamId);
      toast.success("تیم با موفقیت تایید شد");
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, status: "accepted" } : team
        )
      );
      setSelectedTeam(null);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.message || "خطا در تایید تیم");
    } finally {
      setApproving(null);
    }
  };

  const handleRejectTeam = async (teamId: number) => {
    try {
      setRejecting(teamId);
      await rejectTeamService(teamId);
      toast.success("تیم رد شد");
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, status: "rejected" } : team
        )
      );
      setSelectedTeam(null);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.message || "خطا در رد کردن تیم");
    } finally {
      setRejecting(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.members.some(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || team.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((user) => {
    return (
      user.first_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.phone?.includes(userSearchTerm) ||
      user.national_code?.includes(userSearchTerm)
    );
  });

  const statusConfig: Record<
    TeamStatus,
    { color: string; label: string; icon: any; bgClass: string }
  > = {
    draft: {
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      label: "پیش‌نویس",
      icon: FileText,
      bgClass: "bg-gray-500/20 text-gray-400",
    },
    submitted: {
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      label: "ثبت‌نام شده",
      icon: Users,
      bgClass: "bg-blue-500/20 text-blue-400",
    },
    waiting_for_payment: {
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      label: "در انتظار پرداخت",
      icon: CreditCard,
      bgClass: "bg-orange-500/20 text-orange-400",
    },
    receipt_pending: {
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      label: "در انتظار رسید",
      icon: Receipt,
      bgClass: "bg-yellow-500/20 text-yellow-400",
    },
    accepted: {
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      label: "تایید شده",
      icon: CheckCircle,
      bgClass: "bg-green-500/20 text-green-400",
    },
    rejected: {
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      label: "رد شده",
      icon: XCircle,
      bgClass: "bg-red-500/20 text-red-400",
    },
  };

  const getStats = () => {
    return {
      total: teams.length,
      draft: teams.filter((t) => t.status === "draft").length,
      submitted: teams.filter((t) => t.status === "submitted").length,
      waiting_for_payment: teams.filter(
        (t) => t.status === "waiting_for_payment"
      ).length,
      receipt_pending: teams.filter((t) => t.status === "receipt_pending")
        .length,
      accepted: teams.filter((t) => t.status === "accepted").length,
      rejected: teams.filter((t) => t.status === "rejected").length,
    };
  };

  const stats = getStats();

  const getStatusMessage = (status: TeamStatus) => {
    const messages: Record<TeamStatus, { emoji: string; text: string }> = {
      accepted: { emoji: "✅", text: "این تیم قبلاً تایید شده است" },
      rejected: { emoji: "❌", text: "این تیم رد شده است" },
      draft: { emoji: "📝", text: "این تیم در حالت پیش‌نویس است" },
      waiting_for_payment: {
        emoji: "💳",
        text: "این تیم در انتظار پرداخت است",
      },
      submitted: { emoji: "📋", text: "این تیم ثبت‌نام شده است" },
      receipt_pending: { emoji: "🧾", text: "این تیم در انتظار رسید است" },
    };
    return messages[status];
  };

  const renderLoading = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg">
          {activeTab === "teams"
            ? "درحال بارگذاری تیم‌ها..."
            : "درحال بارگذاری کاربران..."}
        </p>
      </div>
    </div>
  );

  if (
    (activeTab === "teams" && loading) ||
    (activeTab === "users" && usersLoading)
  ) {
    return renderLoading();
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[#00274D]/95 backdrop-blur-md border-l border-white/10 transition-all duration-300 z-50 w-72 overflow-y-auto ${
          !sidebarOpen && "hidden"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">پنل مدیریت</h2>
              <p className="text-xs text-gray-400 mt-1">
                سیستم مدیریت تیم‌ها و کاربران
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-3 mb-8">
            <button
              onClick={() => setActiveTab("teams")}
              className={`w-full text-right px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === "teams"
                  ? "bg-[#FFD500] text-[#00274D] font-semibold hover:bg-[#FFD500]/90"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>تایید تیم‌ها</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full text-right px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === "users"
                  ? "bg-[#FFD500] text-[#00274D] font-semibold hover:bg-[#FFD500]/90"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              {/* <User className="w-5 h-5" /> */}
              <span>مدیریت کاربران</span>
            </button>
          </nav>

          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFD500]" />
              {activeTab === "teams" ? "آمار تیم‌ها" : "آمار کاربران"}
            </h3>
            <div className="space-y-3 text-xs">
              {activeTab === "teams" ? (
                <>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-gray-300">کل تیم‌ها</span>
                    <span className="text-[#FFD500] font-bold text-sm">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-gray-400">پیش‌نویس</span>
                    <span className="text-gray-400 font-semibold">
                      {stats.draft}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-blue-400">ثبت‌نام شده</span>
                    <span className="text-blue-400 font-semibold">
                      {stats.submitted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-orange-400">در انتظار پرداخت</span>
                    <span className="text-orange-400 font-semibold">
                      {stats.waiting_for_payment}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-yellow-400">در انتظار رسید</span>
                    <span className="text-yellow-400 font-semibold">
                      {stats.receipt_pending}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-green-400">تایید شده</span>
                    <span className="text-green-400 font-semibold">
                      {stats.accepted}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-red-400">رد شده</span>
                    <span className="text-red-400 font-semibold">
                      {stats.rejected}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                    <span className="text-gray-300">کل کاربران</span>
                    <span className="text-[#FFD500] font-bold text-sm">
                      {users.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-green-400">تایید ایمیل شده</span>
                    <span className="text-green-400 font-semibold">
                      {users.filter((u) => u.email_verified).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-yellow-400">تایید ایمیل نشده</span>
                    <span className="text-yellow-400 font-semibold">
                      {users.filter((u) => !u.email_verified).length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-400 transition-all"
          >
            <LogOut className="w-5 h-5 ml-2" />
            خروج از سیستم
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:mr-72 min-h-screen">
        {/* Header */}
        <header className="bg-[#00274D]/90 backdrop-blur-md border-b border-white/10 fixedS top-0 z-40 shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">
                    {activeTab === "teams"
                      ? "مدیریت و تایید تیم‌ها"
                      : "مدیریت کاربران"}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {activeTab === "teams"
                      ? `${filteredTeams.length} تیم از ${teams.length} تیم`
                      : `${filteredUsers.length} کاربر از ${users.length} کاربر`}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-[#FFD500]/20 hover:bg-[#FFD500]/30 text-[#FFD500] border border-[#FFD500]/30"
              >
                <RefreshCw
                  className={`w-5 h-5 ml-2 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "درحال بروزرسانی..." : "بروزرسانی"}
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Search Section */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  activeTab === "teams"
                    ? "جستجو بر اساس نام تیم، توضیحات، نام اعضا یا ایمیل..."
                    : "جستجو بر اساس نام، ایمیل، شماره تلفن یا کد ملی..."
                }
                value={activeTab === "teams" ? searchTerm : userSearchTerm}
                onChange={(e) =>
                  activeTab === "teams"
                    ? setSearchTerm(e.target.value)
                    : setUserSearchTerm(e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD500] focus:ring-2 focus:ring-[#FFD500]/20 transition-all"
              />
            </div>

            {/* Team Filters */}
            {activeTab === "teams" && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {(
                  [
                    "all",
                    "submitted",
                    "waiting_for_payment",
                    "receipt_pending",
                    "accepted",
                    "rejected",
                  ] as const
                ).map((status) => {
                  const Icon =
                    status !== "all" ? statusConfig[status].icon : Users;
                  return (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2.5 rounded-xl transition-all flex-shrink-0 text-sm font-medium flex items-center gap-2 border ${
                        filterStatus === status
                          ? "bg-[#FFD500] text-[#00274D] border-[#FFD500] shadow-lg shadow-[#FFD500]/20"
                          : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {status === "all" && "همه تیم‌ها"}
                      {status === "submitted" && "ثبت‌نام شده"}
                      {status === "waiting_for_payment" && "در انتظار پرداخت"}
                      {status === "receipt_pending" && "در انتظار رسید"}
                      {status === "accepted" && "تایید شده"}
                      {status === "rejected" && "رد شده"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Teams Tab Content */}
          {activeTab === "teams" && (
            <div className="grid grid-cols-1 gap-6">
              {filteredTeams.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                  <Users className="w-24 h-24 mx-auto mb-6 text-gray-500 opacity-50" />
                  <p className="text-gray-400 text-xl mb-3 font-semibold">
                    تیمی یافت نشد
                  </p>
                  <p className="text-gray-500">
                    {searchTerm || filterStatus !== "all"
                      ? "لطفاً عبارت جستجو یا فیلترها را تغییر دهید"
                      : "هنوز هیچ تیمی ثبت‌نام نکرده است"}
                  </p>
                </div>
              ) : (
                filteredTeams.map((team) => {
                  const StatusIcon = statusConfig[team.status].icon;
                  const canApprove =
                    team.status === "submitted" ||
                    team.status === "receipt_pending";
                  const statusMsg = getStatusMessage(team.status);

                  return (
                    <div
                      key={team.id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 group shadow-xl"
                    >
                      {/* Team Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <h2 className="text-2xl font-bold text-white group-hover:text-[#FFD500] transition-colors">
                              {team.name}
                            </h2>
                            <span
                              className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-2 ${
                                statusConfig[team.status].color
                              }`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              {statusConfig[team.status].label}
                            </span>
                          </div>

                          {team.description && (
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                              {team.description}
                            </p>
                          )}

                          <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                              <Users className="w-4 h-4 text-[#FFD500]" />
                              <span>{team.members?.length || 0} عضو</span>
                            </div>
                            {team.receipt_image_url && (
                              <a
                                href={team.receipt_image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-colors text-green-400"
                              >
                                <Receipt className="w-4 h-4" />
                                <span>مشاهده رسید</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            setSelectedTeam(
                              selectedTeam?.id === team.id ? null : team
                            )
                          }
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/20"
                        >
                          <Eye className="w-5 h-5 ml-2" />
                          {selectedTeam?.id === team.id
                            ? "بستن جزئیات"
                            : "مشاهده جزئیات"}
                        </Button>
                      </div>

                      {/* Team Members Preview */}
                      <div className="mb-6 p-5 bg-white/5 rounded-xl border border-white/10">
                        <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
                          <Users className="w-5 h-5 text-[#FFD500]" />
                          اعضای تیم
                          <span className="text-sm text-gray-400">
                            ({team.members?.length || 0} نفر)
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {team.members?.slice(0, 3).map((member) => (
                            <div
                              key={member.id}
                              className="bg-white/5 rounded-lg p-3 border border-white/5 hover:border-[#FFD500]/30 hover:bg-white/10 transition-all"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#FFD500] to-[#FFC500] rounded-full flex items-center justify-center text-sm font-bold text-[#00274D]">
                                  {member.first_name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm truncate">
                                    {member.first_name} {member.last_name}
                                  </p>
                                  <p
                                    className={`text-xs ${
                                      member.id === team.creator_id
                                        ? "text-[#FFD500]"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {member.id === team.creator_id
                                      ? "👑 کاپیتان"
                                      : "عضو تیم"}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {member.email}
                              </p>
                            </div>
                          ))}
                          {team.members && team.members.length > 3 && (
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                              <span className="text-sm text-gray-400 font-medium">
                                + {team.members.length - 3} عضو دیگر
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-6">
                        {/* Receipt Verification Button */}
                        {team.receipt_image_url &&
                          team.status === "receipt_pending" && (
                            <div className=" mt-3">
                              <Button
                                onClick={() =>
                                  handleOpenReceiptModal(team.id, team.name)
                                }
                                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 w-full"
                              >
                                <Receipt className="w-4 h-4 ml-1" />
                                تایید/رد فیش
                              </Button>
                            </div>
                          )}
                      </div>

                      {/* Expanded Details */}
                      {selectedTeam?.id === team.id && (
                        <div className="mb-6 p-6 bg-gradient-to-br from-[#FFD500]/10 to-[#FFD500]/5 rounded-xl border border-[#FFD500]/30 space-y-6 animate-in fade-in duration-300">
                          <h3 className="font-semibold flex items-center gap-2 text-lg">
                            <Award className="w-6 h-6 text-[#FFD500]" />
                            اطلاعات کامل اعضای تیم
                          </h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {team.members?.map((member) => (
                              <div
                                key={member.id}
                                className="bg-white/10 rounded-xl p-5 border border-white/10 hover:border-[#FFD500]/40 transition-all duration-200 hover:shadow-lg"
                              >
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD500] to-[#FFC500] rounded-full flex items-center justify-center text-xl font-bold text-[#00274D]">
                                    {member.first_name.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-lg">
                                      {member.first_name} {member.last_name}
                                    </p>
                                    <p
                                      className={`text-sm flex items-center gap-1 ${
                                        member.id === team.creator_id
                                          ? "text-[#FFD500]"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {member.id === team.creator_id && "👑"}
                                      {member.id === team.creator_id
                                        ? "کاپیتان تیم"
                                        : "عضو تیم"}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-3 text-sm">
                                  <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-2 rounded-lg">
                                    <Mail className="w-4 h-4 text-[#FFD500] flex-shrink-0" />
                                    <span className="truncate">
                                      {member.email}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-2 rounded-lg">
                                    <Phone className="w-4 h-4 text-[#FFD500] flex-shrink-0" />
                                    <span>{member.phone}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {canApprove && team.status !== "receipt_pending" ? (
                        <div className="flex gap-3 pt-6 border-t border-white/10">
                          <Button
                            onClick={() => handleApproveTeam(team.id)}
                            disabled={approving === team.id}
                            className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 hover:border-green-400 transition-all shadow-lg hover:shadow-green-500/20"
                          >
                            <CheckCircle className="w-5 h-5 ml-2" />
                            {approving === team.id
                              ? "درحال تایید..."
                              : "✓ تایید تیم"}
                          </Button>
                          <Button
                            onClick={() => handleRejectTeam(team.id)}
                            disabled={rejecting === team.id}
                            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-400 transition-all shadow-lg hover:shadow-red-500/20"
                          >
                            <XCircle className="w-5 h-5 ml-2" />
                            {rejecting === team.id ? "درحال رد..." : "✗ رد تیم"}
                          </Button>
                        </div>
                      ) : (
                        <div className="pt-6 border-t border-white/10">
                          <div
                            className={`text-center p-4 rounded-xl font-medium ${
                              statusConfig[team.status].bgClass
                            }`}
                          >
                            {statusMsg.emoji} {statusMsg.text}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Users Tab Content */}
          {activeTab === "users" && (
            <div className="grid grid-cols-1 gap-6">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                  {/* <User className="w-24 h-24 mx-auto mb-6 text-gray-500 opacity-50" /> */}
                  <p className="text-gray-400 text-xl mb-3 font-semibold">
                    کاربری یافت نشد
                  </p>
                  <p className="text-gray-500">
                    {userSearchTerm
                      ? "لطفاً عبارت جستجو را تغییر دهید"
                      : "هنوز هیچ کاربری ثبت‌نام نکرده است"}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 group shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD500] to-[#FFC500] rounded-full flex items-center justify-center text-xl font-bold text-[#00274D]">
                            {user.first_name.charAt(0)}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white group-hover:text-[#FFD500] transition-colors">
                              {user.first_name} {user.last_name}
                            </h2>
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                                  user.email_verified
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }`}
                              >
                                {user.email_verified
                                  ? "✓ تایید ایمیل"
                                  : "⏳ در انتظار تایید"}
                              </span>
                              {user.ip_address && (
                                <span className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm">
                                  <Globe className="w-4 h-4" />
                                  IP: {user.ip_address}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg">
                              <Mail className="w-4 h-4 text-[#FFD500] flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-400">ایمیل</p>
                                <p className="truncate">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg">
                              <Phone className="w-4 h-4 text-[#FFD500] flex-shrink-0" />
                              <div>
                                <p className="text-sm text-gray-400">
                                  شماره تلفن
                                </p>
                                <p>{user.phone}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-sm text-gray-400 mb-1">
                                کد ملی
                              </p>
                              <p className="text-gray-300">
                                {user.national_code}
                              </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-sm text-gray-400 mb-1">
                                دانشگاه
                              </p>
                              <p className="text-gray-300">
                                {user.university || "ثبت نشده"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-sm text-gray-400 mb-1">
                                سایز تی‌شرت
                              </p>
                              <p className="text-gray-300">
                                {user.tshirt_size || "ثبت نشده"}
                              </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                              <p className="text-sm text-gray-400 mb-1">
                                تاریخ ثبت‌نام
                              </p>
                              <p className="text-gray-300 text-sm">
                                {new Date(user.created_at).toLocaleDateString(
                                  "fa-IR"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {/* مودال تایید/رد فیش */}
        {showReceiptModal && selectedReceipt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#00274D] border border-white/10 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold">تایید فیش پرداخت</h3>
              </div>

              <p className="text-gray-300 mb-4">
                آیا از {selectedReceipt.approved ? "تایید" : "رد"} فیش پرداخت
                تیم
                <span className="text-[#FFD500] font-semibold">
                  {" "}
                  {selectedReceipt.teamName}{" "}
                </span>
                مطمئن هستید؟
              </p>

              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">
                  یادداشت (اختیاری)
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="یادداشت برای تیم..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD500] focus:ring-2 focus:ring-[#FFD500]/20 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowReceiptModal(false);
                    setSelectedReceipt(null);
                    setVerificationNotes("");
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                >
                  انصراف
                </Button>
                <Button
                  onClick={() => handleVerifyReceipt(selectedReceipt.id, false)}
                  disabled={verifyingReceipt === selectedReceipt.id}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                >
                  {verifyingReceipt === selectedReceipt.id ? (
                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin ml-2" />
                  ) : (
                    <XCircle className="w-5 h-5 ml-2" />
                  )}
                  رد فیش
                </Button>
                <Button
                  onClick={() => handleVerifyReceipt(selectedReceipt.id, true)}
                  disabled={verifyingReceipt === selectedReceipt.id}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                >
                  {verifyingReceipt === selectedReceipt.id ? (
                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin ml-2" />
                  ) : (
                    <CheckCircle className="w-5 h-5 ml-2" />
                  )}
                  تایید فیش
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminTeamsApproval;
