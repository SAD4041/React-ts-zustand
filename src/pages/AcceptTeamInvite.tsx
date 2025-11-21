import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BG from "@/assets/BG.png";
import ELMOCPC from "@/assets/ELMOCPC.svg";
import CESA from "@/assets/CESA.svg";

interface TeamInviteData {
  teamName?: string;
  teamId?: string;
  invitedBy?: string;
  invitedByEmail?: string;
  role?: string;
  email?: string;
}

function AcceptTeamInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inviteData, setInviteData] = useState<TeamInviteData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("توکن دعوت یافت نشد");
      return;
    }

    fetchTeamInviteData();
  }, [token]);

  const fetchTeamInviteData = async () => {
    try {
      setLoading(true);
      console.log("Fetching team invite with token:", token);

      // API call برای دریافت اطلاعات دعوت تیم
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/teams/invites/info?token=${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "دعوت معتبر نیست یا منقضی شده است"
        );
      }

      const data = await response.json();
      console.log("Team invite data:", data);
      setInviteData(data.data);
    } catch (err: any) {
      console.error("Error fetching team invite:", err);
      setError(err.message || "خطا در بارگذاری اطلاعات دعوت");
      toast.error(err.message || "خطا در بارگذاری اطلاعات دعوت");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTeamInvite = async () => {
    try {
      setLoading(true);
      console.log("Accepting team invite with token:", token);

      // API call برای قبول دعوت تیم
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/teams/invites/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "خطا در قبول دعوت. لطفا دوباره تلاش کنید."
        );
      }

      const data = await response.json();
      console.log("Accept team invite response:", data);

      toast.success(`شما به تیم ${inviteData?.teamName} اضافه شدید!`);

      // ریدایرکت به داشبورد یا صفحه تیم
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Error accepting team invite:", err);
      setError(err.message || "خطا در قبول دعوت");
      toast.error(err.message || "خطا در قبول دعوت");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectTeamInvite = async () => {
    try {
      setLoading(true);
      console.log("Rejecting team invite with token:", token);

      // API call برای رد کردن دعوت تیم
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/teams/invites/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "خطا در رد کردن دعوت. لطفا دوباره تلاش کنید."
        );
      }

      const data = await response.json();
      console.log("Reject team invite response:", data);

      toast.success("دعوت رد شد");

      // ریدایرکت به صفحه اصلی
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      console.error("Error rejecting team invite:", err);
      setError(err.message || "خطا در رد کردن دعوت");
      toast.error(err.message || "خطا در رد کردن دعوت");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        {error ? (
          <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-3xl text-red-400">✕</span>
              </div>
              <h1 className="text-white text-2xl text-center font-semibold">
                خطا در پردازش دعوت
              </h1>
              <p className="text-white/70 text-center text-sm">{error}</p>
              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  بازگشت به لاگین
                </Button>
              </div>
            </div>
          </div>
        ) : loading && !inviteData ? (
          <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 border-4 border-[#FFD500]/30 border-t-[#FFD500] rounded-full animate-spin" />
              <p className="text-white text-center">
                درحال بارگذاری اطلاعات دعوت...
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#00274D]/85 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-[#FFD500]/20 rounded-full flex items-center justify-center">
                <span className="text-3xl text-[#FFD500]">👥</span>
              </div>

              <h1 className="text-white text-2xl text-center font-semibold">
                دعوت به تیم
              </h1>

              {inviteData?.teamName && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 w-full">
                  <p className="text-white/70 text-center text-sm">
                    نام تیم:
                  </p>
                  <p className="text-[#FFD500] text-center text-lg font-semibold mt-1">
                    {inviteData.teamName}
                  </p>
                </div>
              )}

              {inviteData?.invitedBy && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 w-full">
                  <p className="text-white/70 text-center text-sm">
                    دعوت‌کننده:
                  </p>
                  <p className="text-white text-center text-lg font-semibold mt-1">
                    {inviteData.invitedBy}
                  </p>
                  {inviteData.invitedByEmail && (
                    <p className="text-white/50 text-center text-sm mt-1">
                      {inviteData.invitedByEmail}
                    </p>
                  )}
                </div>
              )}

              {inviteData?.role && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 w-full">
                  <p className="text-white/70 text-center text-sm">
                    نقش:
                  </p>
                  <p className="text-white text-center text-lg font-semibold mt-1">
                    {inviteData.role}
                  </p>
                </div>
              )}

              {inviteData?.email && (
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 w-full">
                  <p className="text-white/70 text-center text-sm">
                    ایمیل:
                  </p>
                  <p className="text-white text-center text-sm mt-1 break-all">
                    {inviteData.email}
                  </p>
                </div>
              )}

              <p className="text-white/70 text-center text-sm">
                آیا می‌خواهید به این تیم اضافه شوید؟
              </p>

              <div className="flex gap-3 w-full">
                <Button
                  onClick={handleAcceptTeamInvite}
                  disabled={loading}
                  className="flex-1 bg-[#FFD500] hover:bg-[#e6c200] text-[#00274D] font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "درحال پردازش..." : "قبول"}
                </Button>
                <Button
                  onClick={handleRejectTeamInvite}
                  disabled={loading}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
                >
                  رد کردن
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <img
        src={ELMOCPC}
        alt="ELMOCPC Logo"
        className="absolute bottom-4 right-4 w-32 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />

      <img
        src={CESA}
        alt="CESA Logo"
        className="absolute bottom-4 left-4 w-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

export default AcceptTeamInvite;