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
  Clock,
  Filter,
  LogOut,
  Menu,
  X,
  Eye,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  name: string;
  familyName: string;
  email: string;
  phone: string;
  studentId: string;
  university: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  captain: TeamMember;
}

function AdminTeamsApproval() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [approving, setApproving] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);


  useEffect(() => {
    fetchTeams();
  }, []);
  const fetchTeams = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/teams`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
          return;
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // 🆕 چک کن content-type JSON باشه
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response content-type:", contentType);
        throw new Error("API response is not valid JSON");
      }

      const data = await response.json();
      console.log("Teams:", data);
      setTeams(data.data || data || []);
    } catch (err: any) {
      console.error("Error fetching teams:", err);
      setError(err.message);
      toast.error(err.message || "خطا در بارگذاری تیم‌ها");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTeam = async (teamId: string) => {
    try {
      setApproving(teamId);
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/teams/${teamId}/approve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("خطا در تایید تیم");
      }

      toast.success("تیم با موفقیت تایید شد");
      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId ? { ...team, status: "approved" } : team
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

  const handleRejectTeam = async (teamId: string) => {
    try {
      setRejecting(teamId);
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/teams/${teamId}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("خطا در رد کردن تیم");
      }

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
      team.captain?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || team.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColor = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const statusLabel = {
    pending: "در انتظار تایید",
    approved: "تایید شده",
    rejected: "رد شده",
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

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#00274D] via-[#003D6B] to-[#00274D] text-white"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full bg-[#00274D]/95 backdrop-blur-md border-l border-white/10 transition-all duration-300 z-50 w-64 overflow-y-auto ${
          !sidebarOpen && "hidden"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 hover:bg-white/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-3 mb-8">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-[#FFD500] text-[#00274D] font-semibold">
              <Users className="w-5 h-5 inline-block ml-2" />
              تایید تیم‌ها
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 text-white/80">
              <Users className="w-5 h-5 inline-block ml-2" />
              کاربران
            </button>
          </nav>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
          >
            <LogOut className="w-5 h-5 ml-2" />
            خروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:mr-64">
        {/* Header */}
        <header className="bg-[#00274D]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">تایید تیم‌ها</h1>
            </div>
            <span className="text-sm text-gray-400">
              {filteredTeams.length} تیم
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو نام تیم یا کاپیتان..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD500]"
              />
            </div>

            <div className="flex gap-2">
              {(["all", "pending", "approved", "rejected"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      filterStatus === status
                        ? "bg-[#FFD500] text-[#00274D]"
                        : "bg-white/5 hover:bg-white/10 text-white/80"
                    }`}
                  >
                    {status === "all" ? "همه" : statusLabel[status]}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredTeams.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">تیمی یافت نشد</p>
              </div>
            ) : (
              filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
                >
                  {/* Team Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">{team.name}</h2>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                            statusColor[team.status]
                          }`}
                        >
                          {statusLabel[team.status]}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        تاریخ ثبت‌نام:{" "}
                        {new Date(team.createdAt).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        setSelectedTeam(
                          selectedTeam?.id === team.id ? null : team
                        )
                      }
                      className="bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Eye className="w-5 h-5 ml-2" />
                      جزئیات
                    </Button>
                  </div>

                  {/* Team Members Preview */}
                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      اعضای تیم ({team.members?.length || 0})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {team.members?.slice(0, 3).map((member, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 rounded-lg p-3 border border-white/5"
                        >
                          <p className="font-semibold text-sm">
                            {member.name} {member.familyName}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {member.role || "عضو"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {member.email}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedTeam?.id === team.id && (
                    <div className="mb-6 p-4 bg-[#FFD500]/5 rounded-xl border border-[#FFD500]/30 space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#FFD500]" />
                        تمام اعضا
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {team.members?.map((member, idx) => (
                          <div
                            key={idx}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-[#FFD500]/20 rounded-full flex items-center justify-center">
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {member.name} {member.familyName}
                                </p>
                                <p className="text-xs text-[#FFD500]">
                                  {member.role || "عضو"}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-gray-300">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-300">
                                <Phone className="w-4 h-4" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-300">
                                <Award className="w-4 h-4" />
                                <span>{member.studentId}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {team.status === "pending" && (
                    <div className="flex gap-3 pt-6 border-t border-white/10">
                      <Button
                        onClick={() => handleApproveTeam(team.id)}
                        disabled={approving === team.id}
                        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                      >
                        <CheckCircle className="w-5 h-5 ml-2" />
                        {approving === team.id ? "درحال تایید..." : "تایید"}
                      </Button>
                      <Button
                        onClick={() => handleRejectTeam(team.id)}
                        disabled={rejecting === team.id}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                      >
                        <XCircle className="w-5 h-5 ml-2" />
                        {rejecting === team.id ? "درحال رد..." : "رد کردن"}
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminTeamsApproval;
